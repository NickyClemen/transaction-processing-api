resource "aws_iam_role" "transactions-processing-policy" {
  name = "${var.transactions-processing}-policy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "queued-transactions-sqs_policy" {
  name        = "${var.queued-transactions}-sqs_policy"
  description = "${var.queued-transactions}-sqs_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "sqs:SendMessage",
          "sqs:GetQueueAttributes"
        ],
        Effect   = "Allow",
        Resource = "${var.sqs_arn}"
      },
    ]
  })
}

resource "aws_iam_policy" "receive-transactions-policy" {
  name        = "${var.receive-transactions}-policy"
  description = "${var.receive-transactions}-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        Effect   = "Allow",
        Resource = "${var.sqs_arn}"
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda-logging_policy" {
  name        = "${var.queued-transactions}-logging_policy"
  description = "${var.queued-transactions}-logging_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "transactions-processing-logging" {
  role       = aws_iam_role.transactions-processing-policy.name
  policy_arn = aws_iam_policy.lambda-logging_policy.arn
}

resource "aws_iam_role_policy_attachment" "queued-transactions-sqs" {
  role       = aws_iam_role.transactions-processing-policy.name
  policy_arn = aws_iam_policy.queued-transactions-sqs_policy.arn
}

resource "aws_iam_role_policy_attachment" "receive-transactions-sqs" {
  role       = aws_iam_role.transactions-processing-policy.name
  policy_arn = aws_iam_policy.receive-transactions-policy.arn
}
