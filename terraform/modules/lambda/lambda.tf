resource "aws_s3_bucket" "validation-service-bucket" {
  bucket = "validation-service-bucket"
}

data "archive_file" "validation-service-lambda" {
  type = "zip"

  source_dir  = "${path.module}/dist/apps/receive-transactions"
  output_path = "${path.module}/dist.zip"
}

resource "aws_s3_object" "validation-service-lambda" {
  bucket = aws_s3_bucket.validation-service-bucket.id

  key    = "dist.zip"
  source = data.archive_file.validation-service-lambda.output_path

  etag = filemd5(data.archive_file.validation-service-lambda.output_path)
}


resource "aws_lambda_function" "validation-service-lambda" {
  function_name = var.lambda_name
  handler       = "./dist/receive-transactions/main.handler"
  role          = "arn:aws:iam::000000000000:role/trigger-lambda"
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.validation-service-bucket.id
  s3_key    = aws_s3_object.validation-service-lambda.key
}

resource "aws_iam_role" "validation-service-lambda" {
  name = "validation-service-lambda-policy"

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
  name        = "${var.lambda_name}-lambda-policy"
  description = "${var.lambda_name}-lambda-policy"

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
