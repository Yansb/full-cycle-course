package database

import (
	"database/sql"

	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
)

type TransactionDB struct {
	db *sql.DB
}

func NewTransactionDB(db *sql.DB) *TransactionDB {
	return &TransactionDB{db: db}
}

func (t *TransactionDB) Create(transaction *entity.Transaction) error {
	stmt, err := t.db.Prepare("INSERT INTO transactions (id, account_id_from, account_id_to, amount, created_at) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(transaction.ID, transaction.AccountFrom.ID, transaction.AccountTo.ID, transaction.Amount, transaction.CreatedAt)
	if err != nil {
		return err
	}
	return nil
}
