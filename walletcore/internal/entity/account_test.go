package entity_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
)

func TestCreateAccount(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "john@doe")
	account := entity.NewAccount(client)
	assert.NotNil(t, account)
	assert.Equal(t, account.Client.ID, client.ID)
}

func TestCreateAccountWithNilClient(t *testing.T) {
	account := entity.NewAccount(nil)
	assert.Nil(t, account)
}

func TestCreditAccount(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "john@doe")
	account := entity.NewAccount(client)
	account.Credit(100)
	assert.Equal(t, account.Balance, float64(100))
}

func TestDebitAccount(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "john@doe")
	account := entity.NewAccount(client)
	account.Credit(100)
	account.Debit(50)
	assert.Equal(t, account.Balance, float64(50))
}
