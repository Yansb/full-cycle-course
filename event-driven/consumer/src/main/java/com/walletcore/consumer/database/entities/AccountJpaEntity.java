package com.walletcore.consumer.database.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

@Entity(
        name = "Account"
)
@Table(
        name = "accounts"
)
public class AccountJpaEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "client_id", nullable = false)
    private String clientId;

    @Column(name = "balance", nullable = false)
    private Double balance;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATE")
    private Instant createdAt;
}
