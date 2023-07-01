package entity_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
)

func TestCreateNewClient(t *testing.T) {
	client, err := entity.NewClient("John Doe", "john@doe.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "john@doe.com", client.Email)
}

func TestCreateNewClientWhenArgsAreInvalid(t *testing.T) {
	client, err := entity.NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestUpdateClient(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "wrong@email.com")
	assert.Equal(t, "wrong@email.com", client.Email)

	err := client.Update("John Doe", "john@doe.com")
	assert.Nil(t, err)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "john@doe.com", client.Email)

}

func TestUpdateClientWithInvalidArgs(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "john@doe.com")
	err := client.Update("", "")

	assert.NotNil(t, err)
}

func TestAddAccountToClient(t *testing.T) {
	client, _ := entity.NewClient("John Doe", "john@doe.com")
	account := entity.NewAccount(client)
	err := client.AddAccount(account)

	assert.Nil(t, err)
	assert.Equal(t, 1, len(client.Accounts))
}
