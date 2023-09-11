package com.walletcore.consumer;

import com.walletcore.consumer.database.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {
    @Autowired
    private AccountRepository accountRepository;

    @KafkaListener(topics = "balances", groupId = "consumer")
    void listener(String data) {

        System.out.println(this.accountRepository.findAll());
    }
}
