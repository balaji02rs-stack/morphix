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
            throw new RuntimeException("Invalid PNG Image");
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

}