resource "aws_sqs_queue" "queue" {
  name                       = var.queue_name
  fifo_queue                 = var.fifo_queue
  delay_seconds              = var.delay_seconds
  message_retention_seconds  = var.message_retention_seconds
  visibility_timeout_seconds = var.visibility_timeout_seconds

  redrive_policy = var.dlq_enabled ? jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq_queue.0.arn

    maxReceiveCount = var.dlq_max_receive_count
  }) : null
}


resource "aws_sqs_queue" "dlq_queue" {
  count = var.dlq_enabled ? 1 : 0

  name                      = local.dlq_queue_name
  message_retention_seconds = var.dlq_message_retention_seconds
}

resource "aws_iam_policy" "sqs-policy" {
  name        = "${var.queue_name}-sqs-policy"
  description = "${var.queue_name}-sqs-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}
