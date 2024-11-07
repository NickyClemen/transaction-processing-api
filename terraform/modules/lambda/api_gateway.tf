resource "aws_api_gateway_rest_api" "transactions-processing_api-gwt" {
  name = "${var.transactions-processing}_api-gwt"
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

resource "aws_api_gateway_integration" "receive" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.queued-transactions-lambda.invoke_arn
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.queued-transactions-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.transactions-processing_api-gwt.execution_arn}/*/*"
}

/* resource "aws_apigatewayv2_stage" "transactions-processing_api-gwt-stage" {
  api_id = aws_apigatewayv2_api.transactions-processing_api-gwt.id

  name        = "${var.transactions-processing}_api-gwt-stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.queue-transactions_logs.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
} */

/* resource "aws_cloudwatch_log_group" "transactions-processing_api-gwt-logs" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.transactions-processing_api-gwt.name}"

  retention_in_days = 30
} */
