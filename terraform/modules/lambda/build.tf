/* data "archive_file" "transactions-processing-api" {
  type = "zip"

  source_dir  = "${path.module}/../../dist"
  output_path = "${path.module}/.terraform/archive_files/dist.zip"

  depends_on = [null_resource.bootstrap]
}


resource "null_resource" "bootstrap" {
  triggers = {
    updated_at = timestamp()
  }
  provisioner "local-exec" {
    command = <<EOF
    yarn
    yarn build queued-transactions
    yarn build receive-transactions
    EOF

    working_dir = "${path.module}/.."
  }
}
 */
