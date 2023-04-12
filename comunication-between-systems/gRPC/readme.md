# Como testar

- Você vai precisar instalar o GO na versão 20
- Vai precisar tambem instalar o evans para testar o gRPC
- Para instalar o evans, basta rodar o comando abaixo

```bash
go install github.com/ktr0731/evans@latest
```

- Para rodar o projeto, basta rodar o comando abaixo

```bash
go mod tidy
go run cmd/grpcServer/main.go
```

- Basta então rodar o

```bash
evans -r repl
```

E já vai ter acesso a chamar os métodos do gRPC
