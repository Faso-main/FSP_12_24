package io.hakaton.fsp.files.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.hakaton.fsp.files.entity.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    Optional<FileEntity> findByFilename(String filename);


    @Query("SELECT t FROM FileEntity t WHERE t.createdBy = :userId OR :userId MEMBER OF t.accessesUserId")
    List<FileEntity> findByUserIdAnywhere(Long userId);
}
