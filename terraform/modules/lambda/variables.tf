variable "transactions-processing" {
  type    = string
  default = "transactions-processing"
}

variable "receive-transactions" {
  type    = string
  default = "receive-transactions"
}

variable "queued-transactions" {
  type    = string
  default = "queued-transactions"
}

variable "sqs_arn" {
  type    = string
  default = "arn:aws:sqs:us-east-1:000000000000:receive-transactions-queue"
}
