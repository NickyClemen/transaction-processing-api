variable "queue_name" {
  type    = string
  default = "receive-transactions-queue"
}

variable "fifo_queue" {
  type    = bool
  default = false
}

variable "delay_seconds" {
  default = 15 * 60
}

variable "message_retention_seconds" {
  type    = number
  default = 14 * 24 * 60 * 60
}

variable "visibility_timeout_seconds" {
  default = 60
}

variable "dlq_enabled" {
  type    = bool
  default = false
}

variable "dlq_max_receive_count" {
  type    = number
  default = 100
}

variable "dlq_message_retention_seconds" {
  type    = number
  default = 14 * 24 * 60 * 60
}
