package com.walletcore.consumer.database.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;


@Entity(
        name = "Transaction"
)
@Table(
        name = "transactions"
)
public class Transaction {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "account_id_from", nullable = false)
    private String accountIdFrom;

    @Column(name = "account_id_to", nullable = false)
    private String accountIdTo;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATE")
    private Instant createdAt;
}
