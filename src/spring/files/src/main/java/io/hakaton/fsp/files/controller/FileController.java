package io.hakaton.fsp.files.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.hakaton.fsp.files.dto.DocumentsList;
import io.hakaton.fsp.files.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/{category}")
    public ResponseEntity<String> uploadFile(
            @PathVariable String category,
            @RequestParam("file") MultipartFile file, 
            @RequestParam boolean isPublic,
            @RequestParam(required = false) List<Long> userIds,
            @RequestHeader("Authorization") String token
    ) {
        try {
            String urlToFile = fileService.uploadFile(category, file, isPublic, userIds, token);
            return ResponseEntity.status(HttpStatus.CREATED).body(urlToFile);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }

    @GetMapping("/documents")
    public ResponseEntity<List<DocumentsList>> getDocuments(
            @RequestHeader("Authorization") String token
    ) {
        try {
            List<DocumentsList> docLists = fileService.getDocumentsLists(token);
            return ResponseEntity.ok(docLists);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }


    @GetMapping("/{category}/{filename}")
    public ResponseEntity<byte[]> getFile(
            @PathVariable String category,
            @PathVariable String filename, 
            @RequestHeader("Authorization") String token
    ) {
        try {
            byte[] fileData = fileService.getFile(category, filename, token);
            return ResponseEntity.ok(fileData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @PutMapping("/{category}/{filename}")
    public ResponseEntity<String> updateFile(
            @PathVariable String category, 
            @PathVariable String filename, 
            @RequestParam("file") MultipartFile file, 
            @RequestHeader("Authorization") String token
    ) {
        try {
            fileService.updateFile(category, filename, file, token);
            return ResponseEntity.ok("Private file updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File update failed");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }

    @DeleteMapping("/{category}/{filename}")
    public ResponseEntity<String> deleteFile(
            @PathVariable String category,
            @PathVariable String filename, 
            @RequestHeader("Authorization") String token
    ) {
        try {
            fileService.deleteFile(category, filename, token);
            return ResponseEntity.ok("Private file deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }
}
