package main

import (
	"fmt"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {

	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "kafka_kafka_1:9092",
		"client.id":         "go-app-consumer",
		"group.id":          "go-app-group",
		"auto.offset.reset": "earliest",
	}

	c, err := kafka.NewConsumer(configMap)
	if err != nil {
		fmt.Println("Error consumer", err.Error())
	}
	topics := []string{"teste"}
	err = c.SubscribeTopics(topics, nil)
	if err != nil {
		fmt.Println("Error subscribe topics", err.Error())
	}
	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Println(string(msg.Value), msg.TopicPartition)
		}
	}
}
