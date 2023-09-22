resource "aws_security_group" "ansible-sg" {
  name   = "ansible-sg"
  vpc_id = aws_vpc.ansible-vpc.id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "-1"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

  # Terraform removes the default rule, so we re-add it.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [aws_vpc.ansible-vpc]
}

resource "aws_instance" "ubuntu" {
  count           = 3
  ami             = "ami-053b0d53c279acc90"
  subnet_id       = aws_subnet.subnets.id
  instance_type   = "t2.micro"
  key_name        = aws_key_pair.tf-key-pair.key_name
  security_groups = ["${aws_security_group.ansible-sg.id}"]
  tags = {
    Name = "terraform-ec2-example${count.index + 1}"
  }
  depends_on = [aws_vpc.ansible-vpc, aws_security_group.ansible-sg]
}

resource "aws_key_pair" "tf-key-pair" {
  key_name   = "terraform-key-pair"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "tf-key" {
  file_permission = 400
  content         = tls_private_key.rsa.private_key_pem
  filename        = "tf-key-pair"
}

resource "local_file" "hosts" {
  filename = "../terraform-hosts"
  content  = <<EOF
[manager]
${aws_instance.ubuntu.0.public_ip}

[worker]
${aws_instance.ubuntu.1.public_ip}
${aws_instance.ubuntu.2.public_ip}


[all:vars]
ansible_ssh_private_key_file=./terraform/tf-key-pair
ansible_user=ubuntu
EOF
}
