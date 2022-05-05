variable "project" {}

variable "credentials_file" {}

variable "region" {
  default = "europe-north1"
}

variable "zone" {
  default = "europe-north1-a"
}

variable "ssh_username" {
  type = string
}

variable "ssh_pub_key_path" {
  type = string
}
