resource "aws_s3_bucket" "transactions-processing-api-bucket" {
  bucket = var.transactions-processing-api-bucket_name
}

data "archive_file" "transactions-processing-api-data" {
  type = "zip"

  source_dir  = abspath("../${path.root}")
  output_path = "${path.module}/dist.zip"
}

resource "aws_s3_object" "validation-service-lambda" {
  bucket = aws_s3_bucket.transactions-processing-api-bucket.id

  key    = "dist.zip"
  source = data.archive_file.validation-service-lambda.output_path

  etag = filemd5(data.archive_file.validation-service-lambda.output_path)
}

resource "aws_s3_object" "queued-transactions-lambda" {
  bucket = aws_s3_bucket.transactions-processing-api-bucket.id

  key    = "dist.zip"
  source = data.archive_file.queue-transactions-lambda.output_path

  etag = filemd5(data.archive_file.queue-transactions-lambda.output_path)
}

resource "aws_lambda_function" "queue-transactions-lambda" {
  function_name = var.queued-transactions-lambda_name
  role          = "arn:aws:iam::000000000000:role/trigger-lambda"
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api-bucket.id
  s3_key    = aws_s3_object.queued-transactions-lambda.key
}

resource "aws_lambda_function" "validation-service-lambda" {
  function_name = var.validation-service-lambda-lambda_name
  handler       = "./dist/apps/receive-transactions/main.handler"
  role          = "arn:aws:iam::000000000000:role/trigger-lambda"
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api-bucket.id
  s3_key    = aws_s3_object.validation-service-lambda.key
}

resource "aws_lambda_function" "queued-transactions-lambda" {
  function_name = var.validation-service-lambda-lambda_name
  handler       = "./dist/apps/queued-transactions/main.handler"
  role          = "arn:aws:iam::000000000000:role/trigger-lambda"
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api-bucket.id
  s3_key    = aws_s3_object.queued-transactions-lambda.key
}

resource "aws_iam_role" "transactions-processing-api-lambda" {
  name = "${transactions-processing-api}-policy"

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

resource "aws_iam_policy" "lambda_policy" {
  name        = "${var.transactions-processing-api}-lambda-policy"
  description = "${var.transactions-processing-api}-lambda-policy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        "Effect" : "Allow",
        "Resource" : "${var.sqs_arn}"
      },
      {
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect" : "Allow",
        "Resource" : "*"
      }
    ]
  })
}
