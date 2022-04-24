package main

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/yansb/gRPC/pb"
	"google.golang.org/grpc"
)

func main() {
	connection, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}

	defer connection.Close()

	client := pb.NewUserServiceClient(connection)
	// AddUser(client)
	AddUserVerbose(client)
}

func AddUser(client pb.UserServiceClient) {
	req := pb.User{
		Id:    "0",
		Name:  "Yan Santana Barreiro",
		Email: "yan@email.com",
	}

	res, err := client.AddUser(context.Background(), &req)
	if err != nil {
		log.Fatalf("could not make grpc request: %v", err)
	}

	fmt.Println(res)

}

func AddUserVerbose(client pb.UserServiceClient) {
	req := pb.User{
		Id:    "0",
		Name:  "Yan Santana Barreiro",
		Email: "yan@email.com",
	}

	responseStream, err := client.AddUserVerbose(context.Background(), &req)
	if err != nil {
		log.Fatalf("could not make grpc request: %v", err)
	}

	for {
		stream, err := responseStream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("could not receive stream: %v", err)
		}
		fmt.Println("Status:", stream.Status, stream.GetUser())
	}
}
