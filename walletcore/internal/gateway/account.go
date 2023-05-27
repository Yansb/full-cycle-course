package gateway

import "github.com/yansb/full-cycle-course/walletcore/internal/entity"

type AccountGateway interface {
	Save(account *entity.Account) error
	FindByID(id string) (*entity.Account, error)
}
