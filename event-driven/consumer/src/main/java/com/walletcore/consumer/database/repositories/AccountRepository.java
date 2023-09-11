package com.walletcore.consumer.database.repositories;

import com.walletcore.consumer.database.entities.AccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<AccountJpaEntity, String> {
}
