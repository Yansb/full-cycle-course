package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"time"

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
	// AddUserVerbose(client)
	// AddUsers(client)
	AddUserStreamBoth(client)
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

func AddUsers(client pb.UserServiceClient) {
	reqs := []*pb.User{
		{
			Id:    "y1",
			Name:  "Yan",
			Email: "Yan@email.com",
		},
		{
			Id:    "y2",
			Name:  "Yan2",
			Email: "Yan2@email.com",
		},
		{
			Id:    "y3",
			Name:  "Yan3",
			Email: "Yan3@email.com",
		},
		{
			Id:    "y4",
			Name:  "Yan4",
			Email: "Yan4@email.com",
		},
	}

	stream, err := client.AddUsers(context.Background())
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}

	for _, req := range reqs {
		stream.Send(req)
		time.Sleep(time.Second * 2)
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("Error receiving response: %v", err)
	}

	fmt.Println(res)
}

func AddUserStreamBoth(client pb.UserServiceClient) {
	stream, err := client.AddUserStreamBoth(context.Background())
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}

	reqs := []*pb.User{
		{
			Id:    "y1",
			Name:  "Yan",
			Email: "Yan@email.com",
		},
		{
			Id:    "y2",
			Name:  "Yan2",
			Email: "Yan2@email.com",
		},
		{
			Id:    "y3",
			Name:  "Yan3",
			Email: "Yan3@email.com",
		},
		{
			Id:    "y4",
			Name:  "Yan4",
			Email: "Yan4@email.com",
		},
	}
	wait := make(chan int)
	go func() {
		for _, req := range reqs {
			stream.Send(req)
			fmt.Println("Sent:", req.Name)
			time.Sleep(time.Second * 2)
		}
		stream.CloseSend()
	}()

	go func() {
		for {
			res, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalf("Error receiving response: %v", err)
				break
			}
			fmt.Printf("Received user: %v status: %v\n", res.GetUser().Name, res.GetStatus())
		}
		close(wait)
	}()

	<-wait

}
