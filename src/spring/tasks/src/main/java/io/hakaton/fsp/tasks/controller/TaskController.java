package io.hakaton.fsp.tasks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.hakaton.fsp.tasks.dto.TaskRequest;
import io.hakaton.fsp.tasks.entity.Task;
import io.hakaton.fsp.tasks.exception.NoAccessException;
import io.hakaton.fsp.tasks.exception.NotFoundException;
import io.hakaton.fsp.tasks.service.JwtService;
import io.hakaton.fsp.tasks.service.TaskService;

import java.net.URI;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<Task>> getTaskPage(
            @RequestParam(defaultValue = "1") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String category
    ) {
        return ResponseEntity.ok().body(taskService.getTaskByPage(pageNumber, pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        try {
            token = jwtService.deleteBearer(token);
            Long userId = jwtService.extractProfileId(token);
            return ResponseEntity.ok().body(taskService.getTaskById(id, userId));
        } catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestHeader("Authorization") String token,
            @RequestBody TaskRequest entity
    ) {
        try {
            Task newTask = taskService.createTask(entity, token);
            return ResponseEntity.created(URI.create("/tasks/" + newTask.getId())).body(newTask);
        } catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id, 
            @RequestBody TaskRequest entity
    ) {
        try {
            return ResponseEntity.ok().body(taskService.updateTask(id, entity, token));
        } catch(NoAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        try {
            taskService.deleteTask(id, token);
            return ResponseEntity.ok().build();
        } catch(NoAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
