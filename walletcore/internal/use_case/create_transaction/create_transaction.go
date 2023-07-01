package create_transaction

import (
	"context"

	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
	"github.com/yansb/full-cycle-course/walletcore/internal/gateway"
	"github.com/yansb/full-cycle-course/walletcore/pkg/events"
	"github.com/yansb/full-cycle-course/walletcore/pkg/uow"
)

type CreateTransactionInputDTO struct {
	AccountIDFrom string  `json:"account_id_from"`
	AccountIDTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDTO struct {
	ID            string  `json:"id"`
	AccountIdFrom string  `json:"account_id_from"`
	AccountIdTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type BalanceUpdatedOutputDTO struct {
	AccountIdFrom        string  `json:"account_id_from"`
	AccountIdTo          string  `json:"account_id_to"`
	BalanceAccountIdFrom float64 `json:"balance_account_id_from"`
	BalanceAccountIdTo   float64 `json:"balance_account_id_to"`
}

type CreateTransactionUseCase struct {
	Uow                uow.UowInterface
	eventDispatcher    events.EventDispatcherInterface
	transactionCreated events.EventInterface
	balanceUpdated     events.EventInterface
}

func NewCreateTransactionUseCase(
	Uow uow.UowInterface,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreated events.EventInterface,
	balanceUpdated events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		Uow:                Uow,
		eventDispatcher:    eventDispatcher,
		transactionCreated: transactionCreated,
		balanceUpdated:     balanceUpdated,
	}
}

func (uc *CreateTransactionUseCase) Execute(ctx context.Context, input CreateTransactionInputDTO) (*CreateTransactionOutputDTO, error) {
	output := &CreateTransactionOutputDTO{}
	balanceUpdatedOutput := &BalanceUpdatedOutputDTO{}

	err := uc.Uow.Do(ctx, func(_ *uow.Uow) error {
		accountRepository := uc.getAccountRepository(ctx)
		transactionRepository := uc.getTransactionRepository(ctx)
		accountFrom, err := accountRepository.FindByID(input.AccountIDFrom)
		if err != nil {
			return err
		}
		accountTo, err := accountRepository.FindByID(input.AccountIDTo)
		if err != nil {
			return err
		}

		transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
		if err != nil {
			return err
		}

		err = accountRepository.UpdateBalance(accountFrom)
		if err != nil {
			return err
		}
		err = accountRepository.UpdateBalance(accountTo)
		if err != nil {
			return err
		}

		err = transactionRepository.Create(transaction)
		if err != nil {
			return err
		}

		output.ID = transaction.ID
		output.AccountIdFrom = input.AccountIDFrom
		output.AccountIdTo = input.AccountIDTo
		output.Amount = input.Amount

		balanceUpdatedOutput.AccountIdFrom = input.AccountIDFrom
		balanceUpdatedOutput.AccountIdTo = input.AccountIDTo
		balanceUpdatedOutput.BalanceAccountIdFrom = accountFrom.Balance
		balanceUpdatedOutput.BalanceAccountIdTo = accountTo.Balance
		return nil
	})
	if err != nil {
		return nil, err
	}

	uc.transactionCreated.SetPayload(output)
	uc.eventDispatcher.Dispatch(uc.transactionCreated)

	uc.balanceUpdated.SetPayload(balanceUpdatedOutput)
	uc.eventDispatcher.Dispatch(uc.balanceUpdated)

	return output, err
}

func (uc *CreateTransactionUseCase) getAccountRepository(ctx context.Context) gateway.AccountGateway {
	repo, err := uc.Uow.GetRepository(ctx, "AccountDB")
	if err != nil {
		panic(err)
	}

	return repo.(gateway.AccountGateway)
}

func (uc *CreateTransactionUseCase) getTransactionRepository(ctx context.Context) gateway.TransactionGateway {
	repo, err := uc.Uow.GetRepository(ctx, "TransactionDB")
	if err != nil {
		panic(err)
	}

	return repo.(gateway.TransactionGateway)
}
