package io.hakaton.fsp.tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.hakaton.fsp.tasks.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
