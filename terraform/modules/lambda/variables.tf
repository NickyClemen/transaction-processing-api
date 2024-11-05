variable "transactions-processing-api" {
  type    = string
  default = "transactions-processing-api"
}

variable "transactions-processing-api-bucket_name" {
  type    = string
  default = "transactions-processing-api-bucket"
}

variable "validation-service-lambda-lambda_name" {
  type    = string
  default = "validation-service-lambda"
}

variable "queued-transactions-lambda_name" {
  type    = string
  default = "queued-transactions-lambda"
}

variable "sqs_arn" {
  type    = string
  default = "arn:aws:sqs:us-east-1:000000000000:receive-transactions-queue"
}
