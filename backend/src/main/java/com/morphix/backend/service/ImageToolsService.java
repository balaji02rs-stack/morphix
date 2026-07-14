package com.morphix.backend.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
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

        if (image == null)
            throw new RuntimeException("Invalid Image");

        if (x < 0 || y < 0 || width <= 0 || height <= 0)
            throw new RuntimeException("Invalid crop values");

        if (x + width > image.getWidth() ||
                y + height > image.getHeight())
            throw new RuntimeException("Crop area exceeds image size");

        BufferedImage cropped = image.getSubimage(x, y, width, height);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ImageIO.write(cropped, "png", outputStream);

        return outputStream.toByteArray();
    }

    public byte[] rotateImage(MultipartFile file, int angle) throws Exception {

        BufferedImage image = ImageIO.read(file.getInputStream());

        if (image == null)
            throw new RuntimeException("Invalid Image");

        int width = image.getWidth();
        int height = image.getHeight();

        BufferedImage rotated;

        if (angle == 90 || angle == 270) {
            rotated = new BufferedImage(height, width, image.getType());
        } else {
            rotated = new BufferedImage(width, height, image.getType());
        }

        Graphics2D g2d = rotated.createGraphics();

        AffineTransform transform = new AffineTransform();

        switch (angle) {

            case 90:
                transform.translate(height, 0);
                transform.rotate(Math.toRadians(90));
                break;

            case 180:
                transform.translate(width, height);
                transform.rotate(Math.toRadians(180));
                break;

            case 270:
                transform.translate(0, width);
                transform.rotate(Math.toRadians(270));
                break;

            default:
                throw new RuntimeException("Angle must be 90, 180 or 270");
        }

        g2d.setTransform(transform);
        g2d.drawImage(image, 0, 0, null);
        g2d.dispose();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ImageIO.write(rotated, "png", outputStream);

        return outputStream.toByteArray();
    }

}