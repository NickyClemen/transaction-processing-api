resource "aws_lambda_function" "queued-transactions-lambda" {
  function_name = "${var.queued-transactions}_lambda"
  handler       = "./dist/apps/${var.queued-transactions}/main.handler"
  role          = aws_iam_role.transactions-processing-policy.arn
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api_bucket.id
  s3_key    = aws_s3_object.transactions-processing-api.key

  depends_on = [
    aws_iam_role_policy_attachment.transactions-processing-logging,
    aws_iam_role_policy_attachment.queued-transactions-sqs
  ]
}

resource "aws_lambda_function" "receive-transactions-lambda" {
  function_name = "${var.receive-transactions}_lambda"
  handler       = "./dist/apps/${var.receive-transactions}/main.handler"
  role          = aws_iam_role.transactions-processing-policy.arn
  runtime       = "nodejs20.x"
  timeout       = "10"

  s3_bucket = aws_s3_bucket.transactions-processing-api_bucket.id
  s3_key    = aws_s3_object.transactions-processing-api.key

  depends_on = [
    aws_iam_role_policy_attachment.transactions-processing-logging,
    aws_iam_role_policy_attachment.receive-transactions-sqs
  ]
}

resource "aws_lambda_event_source_mapping" "queued-transactions-sqs_invoke" {
  event_source_arn = var.sqs_arn
  function_name    = aws_lambda_function.queued-transactions-lambda.function_name
  batch_size       = 10
  enabled          = 1
}

resource "aws_lambda_event_source_mapping" "receive-transactions_invoke" {
  event_source_arn                   = var.sqs_arn
  function_name                      = aws_lambda_function.receive-transactions-lambda.function_name
  batch_size                         = 10
  maximum_batching_window_in_seconds = 0
}

resource "aws_cloudwatch_log_group" "queue-transactions_logs" {
  name              = "/aws/lambda/${aws_lambda_function.queued-transactions-lambda.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "receive-transactions_logs" {
  name              = "/aws/lambda/${aws_lambda_function.receive-transactions-lambda.function_name}"
  retention_in_days = 30
}
