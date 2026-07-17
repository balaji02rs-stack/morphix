package com.morphix.backend.service;

import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class DocumentToolsService {

    public String health() {
        return "Document Tools Service Ready";
    }

    public byte[] mergePdf(MultipartFile[] files) throws Exception {

        if (files == null || files.length < 2) {
            throw new RuntimeException("Please upload at least two PDF files.");
        }

        PDFMergerUtility merger = new PDFMergerUtility();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        merger.setDestinationStream(outputStream);

        for (MultipartFile file : files) {
            merger.addSource(new ByteArrayInputStream(file.getBytes()));
        }

        merger.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly());

        return outputStream.toByteArray();
    }

    public byte[] splitPdf(MultipartFile file, int pageNumber) throws Exception {

        PDDocument source = PDDocument.load(file.getInputStream());

        int totalPages = source.getNumberOfPages();

        if (pageNumber < 1 || pageNumber >= totalPages) {
            source.close();
            throw new RuntimeException("Page number must be between 1 and " + (totalPages - 1));
        }

        PDDocument part1 = new PDDocument();
        PDDocument part2 = new PDDocument();

        for (int i = 0; i < totalPages; i++) {
            if (i < pageNumber) {
                part1.addPage(source.getPage(i));
            } else {
                part2.addPage(source.getPage(i));
            }
        }

        ByteArrayOutputStream pdf1 = new ByteArrayOutputStream();
        ByteArrayOutputStream pdf2 = new ByteArrayOutputStream();

        part1.save(pdf1);
        part2.save(pdf2);

        part1.close();
        part2.close();
        source.close();

        ByteArrayOutputStream zipOutput = new ByteArrayOutputStream();

        ZipOutputStream zip = new ZipOutputStream(zipOutput);

        zip.putNextEntry(new ZipEntry("part1.pdf"));
        zip.write(pdf1.toByteArray());
        zip.closeEntry();

        zip.putNextEntry(new ZipEntry("part2.pdf"));
        zip.write(pdf2.toByteArray());
        zip.closeEntry();

        zip.close();

        return zipOutput.toByteArray();
    }

    public byte[] protectPdf(MultipartFile file, String password) throws Exception {

        PDDocument document = PDDocument.load(file.getInputStream());

        AccessPermission permission = new AccessPermission();

        StandardProtectionPolicy policy =
                new StandardProtectionPolicy(password, password, permission);

        policy.setEncryptionKeyLength(128);
        policy.setPermissions(permission);

        document.protect(policy);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }

    public byte[] unlockPdf(MultipartFile file, String password) throws Exception {

        PDDocument document = PDDocument.load(file.getInputStream(), password);

        document.setAllSecurityToBeRemoved(true);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }
}