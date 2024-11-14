/* resource "aws_s3_bucket" "transactions-processing-api_bucket" {
  bucket = "${var.transactions-processing}-bucket"
}

resource "aws_s3_object" "transactions-processing-api" {
  bucket = aws_s3_bucket.transactions-processing-api_bucket.id

  key    = "dist.zip"
  source = data.archive_file.transactions-processing-api.output_path
  etag   = filemd5(data.archive_file.transactions-processing-api.output_path)
} */
