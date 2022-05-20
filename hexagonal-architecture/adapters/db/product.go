package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	"github.com/yansb/go-hexagonal/application"
)

type ProductDb struct {
	db *sql.DB
}

// Save(product ProductInterface) (ProductInterface, error)

func NewProductDb(db *sql.DB) *ProductDb {
	return &ProductDb{db}
}

func (p *ProductDb) Get(id string) (application.ProductInterface, error) {
	var product application.Product
	stmt, err := p.db.Prepare("select id, name, price, status from products where id=?")
	if err != nil {
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(&product.ID, &product.Name, &product.Price, &product.Status)
	if err != nil {
		return nil, err
	}

	return &product, nil
}
