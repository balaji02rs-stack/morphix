package com.morphix.backend.controller;

import com.morphix.backend.service.ImageToolsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*")
public class ImageToolsController {

    private final ImageToolsService service;

    public ImageToolsController(ImageToolsService service) {
        this.service = service;
    }

    @GetMapping("/health")
    public String health() {
        return service.health();
    }

    @PostMapping("/jpg-to-png")
    public ResponseEntity<byte[]> jpgToPng(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        byte[] image = service.jpgToPng(file);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"converted.png\""
                )
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }

    @PostMapping("/png-to-jpg")
public ResponseEntity<byte[]> pngToJpg(
        @RequestParam("file") MultipartFile file
) throws Exception {

    byte[] image = service.pngToJpg(file);

    return ResponseEntity.ok()
            .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"converted.jpg\""
            )
            .contentType(MediaType.IMAGE_JPEG)
            .body(image);
}
}