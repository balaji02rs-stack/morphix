package com.morphix.backend.controller;

import com.morphix.backend.service.DocumentToolsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/document")
@CrossOrigin(origins = "*")
public class DocumentToolsController {

    private final DocumentToolsService service;

    public DocumentToolsController(DocumentToolsService service) {
        this.service = service;
    }

    @GetMapping("/health")
    public String health() {
        return service.health();
    }
}