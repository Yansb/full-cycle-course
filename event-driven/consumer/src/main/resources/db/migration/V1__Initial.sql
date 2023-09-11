CREATE TABLE clients
(
    id         varchar(255),
    name       varchar(255),
    email      varchar(255),
    created_at date
);
CREATE TABLE accounts
(
    id         varchar(255),
    client_id  varchar(255),
    balance    int,
    created_at date
);
CREATE TABLE transactions
(
    id              varchar(255),
    account_id_from varchar(255),
    account_id_to   varchar(255),
    amount          int,
    created_at      date
);

INSERT INTO clients (id, name, email, created_at)
VALUES ('1', 'John Doe', 'j@email.com', NOW());
INSERT INTO clients (id, name, email, created_at)
VALUES ('2', 'Jane Doe', 'jane@email.com', NOW());


INSERT INTO accounts (id, client_id, balance, created_at)
VALUES ('1', '1', 1000, NOW());
INSERT INTO accounts (id, client_id, balance, created_at)
VALUES ('2', '2', 0, NOW());