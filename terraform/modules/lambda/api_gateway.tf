resource "aws_api_gateway_rest_api" "transactions-processing_api-gwt" {
  name = "${var.transactions-processing}_api-gwt"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}
resource "aws_api_gateway_resource" "transactions" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  parent_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.root_resource_id
  path_part   = "transactions/receive"
}

resource "aws_api_gateway_method" "transactions" {
  rest_api_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  resource_id   = aws_api_gateway_resource.transactions.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "transactions" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  resource_id = aws_api_gateway_resource.transactions.id
  http_method = aws_api_gateway_method.transactions.http_method

  type                    = "AWS"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.queued-transactions-lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "transactions" {
  rest_api_id = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.transactions.id,
      aws_api_gateway_method.transactions.id,
      aws_api_gateway_integration.transactions.id,
    ]))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "transactions" {
  deployment_id = aws_api_gateway_deployment.transactions.id
  rest_api_id   = aws_api_gateway_rest_api.transactions-processing_api-gwt.id
  stage_name    = "dev"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.queued-transactions-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.transactions-processing_api-gwt.execution_arn}/*/*"
}
