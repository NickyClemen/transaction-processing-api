resource "aws_dynamodb_table" "transactions" {
  name           = var.transactions_table_name
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "accounts" {
  name           = var.accounts_table_name
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "queued_transactions" {
  name           = var.queued_transactions_table_name
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "messageId"

  attribute {
    name = "messageId"
    type = "S"
  }
}
