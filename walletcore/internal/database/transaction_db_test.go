package database_test

import (
	"database/sql"
	"testing"

	"github.com/stretchr/testify/suite"
	"github.com/yansb/full-cycle-course/walletcore/internal/database"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
)

type TransactionDBTestSuite struct {
	suite.Suite
	db            *sql.DB
	client        *entity.Client
	client2       *entity.Client
	accountFrom   *entity.Account
	accountTo     *entity.Account
	transactionDB *database.TransactionDB
}

func (s *TransactionDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("CREATE TABLE clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	db.Exec("CREATE TABLE accounts (id varchar(255), client_id varchar(255), balance int, created_at date)")
	db.Exec("CREATE TABLE transactions (id varchar(255), account_id_from varchar(255), account_id_to varchar(255), amount int, created_at date)")

	client, err := entity.NewClient("John Doe", "j@j.com")
	s.Nil(err)
	s.client = client
	client2, err := entity.NewClient("Jane Doe", "j@j.com")
	s.Nil(err)
	s.client2 = client2

	accountFrom := entity.NewAccount(client)
	accountFrom.Balance = 1000
	s.accountFrom = accountFrom
	accountTo := entity.NewAccount(client2)
	accountTo.Balance = 1000
	s.accountTo = accountTo

	s.transactionDB = database.NewTransactionDB(db)
}

func (s *TransactionDBTestSuite) TearDownSuite() {
	s.db.Close()
	s.db.Exec("DROP TABLE clients")
	s.db.Exec("DROP TABLE accounts")
	s.db.Exec("DROP TABLE transactions")
}

func TestTransactionDBTestSuite(t *testing.T) {
	suite.Run(t, new(TransactionDBTestSuite))
}

func (s *TransactionDBTestSuite) TestCreate() {
	transaction, err := entity.NewTransaction(s.accountFrom, s.accountTo, 100)
	s.Nil(err)
	err = s.transactionDB.Create(transaction)
	s.Nil(err)
}
