package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/yansb/full-cycle-course/walletcore/internal/database"
	"github.com/yansb/full-cycle-course/walletcore/internal/event"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/create_account"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/create_client"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/create_transaction"
	"github.com/yansb/full-cycle-course/walletcore/internal/web"
	"github.com/yansb/full-cycle-course/walletcore/internal/web/webserver"
	"github.com/yansb/full-cycle-course/walletcore/pkg/events"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/wallet?parseTime=true&loc=Local")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	eventDispatcher := events.NewEventDispatcher()
	transactionCreatedEvent := event.NewTransactionCreated()
	// eventDispatcher.Register("TransactionCreated", )

	clientDb := database.NewClientDB(db)
	accountDb := database.NewAccountDB(db)
	transactionDb := database.NewTransactionDB(db)

	createClientUseCase := create_client.NewCreateClientUseCase(clientDb)
	createAccountUseCase := create_account.NewCreateAccountUseCase(accountDb, clientDb)
	createTransactionUseCase := create_transaction.NewCreateTransactionUseCase(
		transactionDb,
		accountDb,
		eventDispatcher,
		transactionCreatedEvent,
	)

	webserver := webserver.NewWebServer(":3000")

	clientHandler := web.NewWebClientHandler(*createClientUseCase)
	accountHandler := web.NewWebAccountHandler(*createAccountUseCase)
	transactionHandler := web.NewWebTransactionHandler(*createTransactionUseCase)

	webserver.AddHandler("/clients", clientHandler.CreateClient)
	webserver.AddHandler("/accounts", accountHandler.CreateAccount)
	webserver.AddHandler("/transactions", transactionHandler.CreateTransaction)

	webserver.Start()
}
