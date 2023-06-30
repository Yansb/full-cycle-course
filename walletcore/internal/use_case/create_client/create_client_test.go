package create_client_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/yansb/full-cycle-course/walletcore/internal/entity"
	"github.com/yansb/full-cycle-course/walletcore/internal/use_case/create_client"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (m *ClientGatewayMock) Get(id string) (*entity.Client, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

func TestCreateClientUseCase_Execute(t *testing.T) {
	mockClientGateway := &ClientGatewayMock{}
	mockClientGateway.On("Save", mock.Anything).Return(nil)
	uc := create_client.NewCreateClientUseCase(mockClientGateway)

	output, err := uc.Execute(create_client.CreateClientInputDTO{
		Name:  "John Doe",
		Email: "j@j",
	})
	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotEmpty(t, output.ID)
	assert.Equal(t, "John Doe", output.Name)
	assert.Equal(t, "j@j", output.Email)
	mockClientGateway.AssertExpectations(t)
	mockClientGateway.AssertNumberOfCalls(t, "Save", 1)
}
