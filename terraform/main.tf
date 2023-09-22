terraform {
  required_version = "1.5.7"
  required_providers {
    aws   = ">=5.17.0"
    local = ">=2.4.0"
  }
  backend "s3" {
    bucket = "yanmytfstatebucket"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

module "new-vpc" {
  source           = "./modules/vpc"
  prefix           = var.prefix
  subnets_quantity = var.subnets_quantity
  vpc_cidr_block   = var.vpc_cidr_block
}

module "eks" {
  source            = "./modules/eks"
  prefix            = var.prefix
  vpc_id            = module.new-vpc.vpc_id
  subnet_ids        = module.new-vpc.subnet_ids
  cluster_name      = var.cluster_name
  retention_days    = var.retention_days
  node_desired_size = var.node_desired_size
  node_max_size     = var.node_max_size
  node_min_size     = var.node_min_size
}
