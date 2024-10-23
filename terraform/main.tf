module "dynamo" {
  source = "./modules/dynamodb"
}

module "sqs" {
  source = "./modules/sqs"
}
