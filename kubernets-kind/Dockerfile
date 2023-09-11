FROM golang:1.21.1-alpine AS build
WORKDIR /go/delivery
COPY . .
RUN go mod download
RUN go build -o server .

FROM alpine:latest
WORKDIR /app
COPY --from=build /go/delivery/server .
EXPOSE 8000
CMD [ "./server" ]

