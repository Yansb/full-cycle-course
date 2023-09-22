variable "prefix" {}
variable "vpc_id" {}
variable "cluster_name" {}
variable "subnet_ids" {
  type = list(string)
}
variable "retention_days" {}
variable "node_desired_size" {}
variable "node_max_size" {}
variable "node_min_size" {}
