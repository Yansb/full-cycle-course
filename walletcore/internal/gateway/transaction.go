package gateway

import "github.com/yansb/full-cycle-course/walletcore/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
