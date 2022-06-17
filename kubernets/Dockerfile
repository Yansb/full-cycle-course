FROM golang:1.18 as builder

WORKDIR /app
COPY main.go .
COPY go.mod .
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o server main.go

FROM scratch
COPY --from=builder /app/server .
CMD [ "./server" ]