package com.morphix.backend.controller;

import com.morphix.backend.service.DocumentToolsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/merge")
    public ResponseEntity<byte[]> mergePdf(
            @RequestParam("files") MultipartFile[] files
    ) throws Exception {

        byte[] pdf = service.mergePdf(files);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"merged.pdf\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/split")
    public ResponseEntity<byte[]> splitPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam int pageNumber
    ) throws Exception {

        byte[] zip = service.splitPdf(file, pageNumber);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"split.zip\""
                )
                .contentType(MediaType.parseMediaType("application/zip"))
                .body(zip);
    }

    @PostMapping("/protect")
    public ResponseEntity<byte[]> protectPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam String password
    ) throws Exception {

        byte[] pdf = service.protectPdf(file, password);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"protected.pdf\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/unlock")
    public ResponseEntity<byte[]> unlockPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam String password
    ) throws Exception {

        byte[] pdf = service.unlockPdf(file, password);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"unlocked.pdf\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}