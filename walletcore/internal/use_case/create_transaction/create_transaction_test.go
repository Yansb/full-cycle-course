package create_transaction_test

import (
	"context"
	"testing"

	"github.com/yansb/full-cycle-course/walletcore/internal/event"
	"github.com/yansb/full-cycle-course/walletcore/pkg/events"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/create_transaction"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/mocks"
)

func TestCreateTransactionUseCase_Execute(t *testing.T) {
	client1, _ := entity.NewClient("John Doe", "j@j")
	account1 := entity.NewAccount(client1)
	account1.Credit(1000)

	client2, _ := entity.NewClient("Jane Doe", "jane@j")
	account2 := entity.NewAccount(client2)
	account2.Credit(1000)

	mockUow := &mocks.UowMock{}
	mockUow.On("Do", mock.Anything, mock.Anything).Return(nil)

	inputDto := create_transaction.CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   account2.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	event := event.NewTransactionCreated()
	ctx := context.Background()
	uc := create_transaction.NewCreateTransactionUseCase(mockUow, dispatcher, event)

	output, err := uc.Execute(ctx, inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output.ID)
	mockUow.AssertExpectations(t)
	mockUow.AssertNumberOfCalls(t, "Do", 1)
}
