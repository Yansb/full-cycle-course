FROM golang:1.20
WORKDIR /go/delivery
COPY . .
RUN go build -o server .
CMD ["./server"]
