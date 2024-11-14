resource "aws_api_gateway_rest_api" "transactions-processing_api-gwt" {
  name = "${var.transactions-processing}_api-gwt"
}

resource "aws_api_gateway_resource" "transactions-post" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  parent_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.root_resource_id
  path_part   = "transactions"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  parent_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.queued-transactions-lambda.invoke_arn
}

resource "aws_cloudwatch_log_group" "transactions-processing_api-gwt-logs" {
  name = "/aws/api_gw/${aws_api_gateway_rest_api.transactions-processing_api-gwt.name}"

  retention_in_days = 30
}
