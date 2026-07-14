package com.morphix.backend.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@Service
public class ImageToolsService {

    public String health() {
        return "Image Tools Service Ready";
    }

    public byte[] jpgToPng(MultipartFile file) throws Exception {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .scale(1.0)
                .outputFormat("png")
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    public byte[] pngToJpg(MultipartFile file) throws Exception {

        BufferedImage image = ImageIO.read(file.getInputStream());

        if (image == null) {
            throw new RuntimeException("Invalid image.");
        }

        BufferedImage rgbImage = new BufferedImage(
                image.getWidth(),
                image.getHeight(),
                BufferedImage.TYPE_INT_RGB
        );

        Graphics2D graphics = rgbImage.createGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, image.getWidth(), image.getHeight());
        graphics.drawImage(image, 0, 0, null);
        graphics.dispose();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ImageIO.write(rgbImage, "jpg", outputStream);

        return outputStream.toByteArray();
    }

    public byte[] resizeImage(MultipartFile file, int width, int height) throws Exception {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .size(width, height)
                .outputFormat("png")
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    public byte[] compressImage(MultipartFile file, float quality) throws Exception {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .scale(1.0)
                .outputQuality(quality)
                .outputFormat("jpg")
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    public byte[] cropImage(
            MultipartFile file,
            int x,
            int y,
            int width,
            int height
    ) throws Exception {

        BufferedImage image = ImageIO.read(file.getInputStream());

        if (image == null) {
            throw new RuntimeException("Invalid image.");
        }

        if (x < 0 || y < 0 || width <= 0 || height <= 0) {
            throw new RuntimeException("Crop values must be positive.");
        }

        if (x + width > image.getWidth() ||
            y + height > image.getHeight()) {

            throw new RuntimeException(
                    "Crop area exceeds image size. Image Size: "
                            + image.getWidth() + "x" + image.getHeight()
            );
        }

        BufferedImage cropped = image.getSubimage(x, y, width, height);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ImageIO.write(cropped, "png", outputStream);

        return outputStream.toByteArray();
    }
}