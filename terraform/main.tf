module "dynamo" {
  source = "./modules/dynamodb"
}

module "sqs" {
  source = "./modules/sqs"
}

module "lambda" {
  source = "./modules/lambda"
}
