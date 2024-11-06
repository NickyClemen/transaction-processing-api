resource "aws_api_gateway_rest_api" "transactions-processing-api" {
  name        = "${var.transactions-processing-api}_api-gateway"
  description = "Transaction Processing API"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing-api.id
  parent_id   = aws_api_gateway_rest_api.transactions-processing-api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.transactions-processing-api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "queue-transactions-lambda" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing-api.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.queue-transactions-lambda.invoke_arn
}