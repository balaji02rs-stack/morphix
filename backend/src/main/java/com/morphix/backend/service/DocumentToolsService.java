package com.morphix.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DocumentToolsService {

    public String health() {
        return "Document Tools Service Ready";
    }
}