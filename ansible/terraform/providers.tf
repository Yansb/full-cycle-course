terraform {
  required_version = "1.5.7"
  required_providers {
    aws   = ">=5.17.0"
    local = ">=2.4.0"
  }

}

provider "aws" {
  region = "us-east-1"
}
