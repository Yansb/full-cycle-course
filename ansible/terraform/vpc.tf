resource "aws_vpc" "ansible-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "ansible-vpc"
  }
}

data "aws_availability_zones" "available" {}

resource "aws_subnet" "subnets" {
  availability_zone       = data.aws_availability_zones.available.names[0]
  vpc_id                  = aws_vpc.ansible-vpc.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "ansible-subnet"
  }
}

resource "aws_internet_gateway" "ansible-igw" {
  vpc_id = aws_vpc.ansible-vpc.id
  tags = {
    Name = "ansible-igw"
  }
}

resource "aws_route_table" "ansible-rtb" {
  vpc_id = aws_vpc.ansible-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ansible-igw.id
  }
  tags = {
    Name = "ansible-rtb"
  }

}

resource "aws_route_table_association" "ansible-rtb-association" {
  route_table_id = aws_route_table.ansible-rtb.id
  subnet_id      = aws_subnet.subnets.id
}
