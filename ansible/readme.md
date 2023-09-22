## Requsitos

- Python 3
- Terraform
- AWS CLI
- Ansible

## Instalação

entre na pasta do terraform e execute o comando:

```bash
terraform init
```

depois

```bash
terraform apply
```

Com isso vai ser gerado o arquivo de hosts na raiz do projeto a partir dai já pode usar o ansible com o comando:

```bash
ansible-playbook -i terraform-hosts playbook.yml
```
