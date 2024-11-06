resource "aws_s3_bucket" "transactions-processing-api-bucket" {
  bucket = var.transactions-processing-api-bucket_name
}

data "archive_file" "transactions-processing-api" {
  type = "zip"

  source_dir  = abspath("../${path.root}/dist")
  output_path = "${path.module}/dist.zip"
}

resource "aws_s3_object" "transactions-processing-api" {
  bucket = aws_s3_bucket.transactions-processing-api-bucket.id

  key    = "dist.zip"
  source = data.archive_file.transactions-processing-api.output_path
  etag   = filemd5(data.archive_file.transactions-processing-api.output_path)
}

resource "aws_lambda_function" "queue-transactions-lambda" {
  function_name = var.queued-transactions-lambda_name
  handler       = "./dist/apps/queued-transactions/main.handler"
  role          = aws_iam_role.transactions-processing-api-lambda.arn
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api-bucket.id
  s3_key    = aws_s3_object.transactions-processing-api.key
}

resource "aws_lambda_function" "receive-transactions" {
  function_name = var.receive-transactions-lambda_name
  handler       = "./dist/apps/receive-transactions/main.handler"
  role          = aws_iam_role.transactions-processing-api-lambda.arn
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api-bucket.id
  s3_key    = aws_s3_object.transactions-processing-api.key
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.queue-transactions-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.transactions-processing-api.execution_arn}/*/*"
}

resource "aws_iam_role" "transactions-processing-api-lambda" {
  name = "${var.transactions-processing-api}-policy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "queued-transactions-lambda_policy" {
  name        = "${var.queued-transactions-lambda_name}-policy"
  description = "${var.queued-transactions-lambda_name}-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "sqs:SendMessage",
          "sqs:GetQueueAttributes"
        ],
        Effect   = "Allow",
        Resource = "${var.sqs_arn}"
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy" "receive-transactions_policy" {
  name        = "${var.receive-transactions-lambda_name}-policy"
  description = "${var.receive-transactions-lambda_name}-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        Effect   = "Allow",
        Resource = "${var.sqs_arn}"
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}
