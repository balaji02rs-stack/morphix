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
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"converted.png\"")
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }

    @PostMapping("/png-to-jpg")
    public ResponseEntity<byte[]> pngToJpg(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        byte[] image = service.pngToJpg(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"converted.jpg\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @PostMapping("/resize")
    public ResponseEntity<byte[]> resizeImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam int width,
            @RequestParam int height
    ) throws Exception {

        byte[] image = service.resizeImage(file, width, height);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"resized.png\"")
                .contentType(MediaType.IMAGE_PNG)
                .body(image);
    }

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam float quality
    ) throws Exception {

        byte[] image = service.compressImage(file, quality);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"compressed.jpg\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @PostMapping("/crop")
public ResponseEntity<?> cropImage(
        @RequestParam("file") MultipartFile file,
        @RequestParam int x,
        @RequestParam int y,
        @RequestParam int width,
        @RequestParam int height
) {

    try {

        byte[] image = service.cropImage(file, x, y, width, height);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"cropped.png\""
                )
                .contentType(MediaType.IMAGE_PNG)
                .body(image);

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.internalServerError()
                .body(e.toString());
    }
}
}