variable "lambda_name" {
  type    = string
  default = "validation-service-lambda"
}

variable "sqs_arn" {
  type    = string
  default = "arn:aws:sqs:us-east-1:000000000000:receive-transactions-queue"
}
