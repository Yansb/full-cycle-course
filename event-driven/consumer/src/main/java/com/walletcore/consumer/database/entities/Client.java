package com.walletcore.consumer.database.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

@Entity(
        name = "Client"
)
@Table(
        name = "clients"
)
public class Client {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATE")
    private Instant createdAt;
}
