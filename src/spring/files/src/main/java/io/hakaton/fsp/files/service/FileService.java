package io.hakaton.fsp.files.service;

import io.hakaton.fsp.files.dto.DocumentsList;
import io.hakaton.fsp.files.entity.FileEntity;
import io.hakaton.fsp.files.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;


import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private JwtService jwtService;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    private DocumentsList convertToDocInfo(FileEntity fileEntity) {
        return new DocumentsList(
            fileEntity.getFilename(),
            fileEntity.getCategory() + '/' + fileEntity.getFilename()
        );
    }

    public List<DocumentsList> getDocumentsLists(String token) 
    {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);
        
        return fileRepository.findByUserIdAnywhere(userId)
                .stream()
                .filter(Objects::nonNull)
                .map(this::convertToDocInfo)
                .collect(Collectors.toList());
    }

    public String uploadFile(String category, MultipartFile file, boolean isPublic, List<Long> userIds, String token) throws IOException 
    {
        token = jwtService.deleteBearer(token);
        String originalFileName = file.getOriginalFilename();
        Path tempPath = Paths.get(uploadDir + File.separator + category + File.separator + originalFileName);
        Files.createDirectories(tempPath);
        Files.copy(file.getInputStream(), tempPath, StandardCopyOption.REPLACE_EXISTING);

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFilename(originalFileName);
        fileEntity.setCategory(category);
        fileEntity.setFilePath(tempPath.toString());
        fileEntity.setPublic(isPublic);
        fileEntity.setCreatedBy(jwtService.extractProfileId(token));
        fileEntity.setAccessesUserId(isPublic ? null : userIds);

        fileRepository.save(fileEntity);

        String uniqueFileName = fileEntity.getId().toString();

        Path finalPath = Paths.get(uploadDir + File.separator + category + File.separator + uniqueFileName);
        Files.move(tempPath, finalPath, StandardCopyOption.REPLACE_EXISTING);

        fileEntity.setFilePath(finalPath.toString());
        fileEntity.setFilename(uniqueFileName);
        fileRepository.save(fileEntity);
        return "/" + fileEntity.getCategory() + "/" + fileEntity.getFilename();
    }

    public byte[] getFile(String category, String filename, String token) throws IOException 
    {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);

        FileEntity fileEntity = fileRepository.findByFilename(filename)
            .orElseThrow(() -> new NoSuchFileException("File not found"));

        if (!fileEntity.isPublic() && 
            !(fileEntity.getCreatedBy() == userId
                || fileEntity.getAccessesUserId().contains(userId)
                || jwtService.extractRoles(token).contains("ROLE_ADMIN"))
        ) {
            throw new SecurityException("Access denied");
        }

        return Files.readAllBytes(Paths.get(fileEntity.getFilePath()));
    }

    @Transactional
    public void updateFile(String category, String filename, MultipartFile file, String token) throws IOException 
    {
        token = jwtService.deleteBearer(token);
        Optional<FileEntity> fileEntityOptional = fileRepository.findByFilename(filename);
        if (fileEntityOptional.isEmpty()) {
            throw new NoSuchFileException("File not found");
        }

        FileEntity fileEntity = fileEntityOptional.get();

        if (!(fileEntity.getCreatedBy().equals(jwtService.extractProfileId(token)) || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
            throw new SecurityException("Access denied");
        }

        Path path = Paths.get(fileEntity.getFilePath());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    }

    @Transactional
    public void deleteFile(String category, String filename, String token) throws IOException 
    {
        token = jwtService.deleteBearer(token);
        Optional<FileEntity> fileEntityOptional = fileRepository.findByFilename(filename);
        if (fileEntityOptional.isEmpty()) {
            throw new NoSuchFileException("File not found");
        }

        FileEntity fileEntity = fileEntityOptional.get();

        if (!fileEntity.getCreatedBy().equals(jwtService.extractProfileId(token)) || !jwtService.extractRoles(token).contains("ROLE_ADMIN")) {
            throw new SecurityException("Access denied");
        }

        Files.delete(Paths.get(fileEntity.getFilePath()));

        fileRepository.delete(fileEntity);
    }
}
