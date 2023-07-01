package entity_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := entity.NewClient("John Doe", "j@j")
	account1 := entity.NewAccount(client1)

	client2, _ := entity.NewClient("Jane Doe", "j@j")
	account2 := entity.NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transactions, err := entity.NewTransaction(account1, account2, 50)
	assert.Nil(t, err)
	assert.NotNil(t, transactions)
	assert.Equal(t, 50.0, account1.Balance)
	assert.Equal(t, 150.0, account2.Balance)
}

func TestCreateTransactionWithInsufficientBalance(t *testing.T) {
	client1, _ := entity.NewClient("John Doe", "j@j")
	account1 := entity.NewAccount(client1)

	client2, _ := entity.NewClient("Jane Doe", "j@j")
	account2 := entity.NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transactions, err := entity.NewTransaction(account1, account2, 150)
	assert.NotNil(t, err)
	assert.Error(t, err, "insufficient funds")
	assert.Nil(t, transactions)
	assert.Equal(t, 100.0, account2.Balance)
	assert.Equal(t, 100.0, account1.Balance)

}
