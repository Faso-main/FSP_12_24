package io.hakaton.fsp.tasks.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.hakaton.fsp.tasks.dto.TaskRequest;
import io.hakaton.fsp.tasks.entity.Task;
import io.hakaton.fsp.tasks.exception.NoAccessException;
import io.hakaton.fsp.tasks.exception.NotFoundException;
import io.hakaton.fsp.tasks.repository.TaskRepository;
import io.hakaton.fsp.tasks.repository.TypePriceRepository;

@Service
public class TaskService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TypePriceRepository typePriceRepository;

    public Task getTaskById(Long id, Long userId) throws NotFoundException {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Task", id));
        
        Set<Long> watched = task.getWatched();
        watched.add(userId);
        task.setWatched(watched);

        return task;
    }

    public Page<Task> getTaskByPage(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize);

        return taskRepository.findAll(pageable);
    }

    public Task createTask(TaskRequest taskRequest, String token) {
        token = jwtService.deleteBearer(token);
        Task task = new Task();

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setNameAuthor(jwtService.extractUserName(token));
        task.setTags(taskRequest.getTags());
        task.setPrice(taskRequest.getPrice());
        task.setTypePrice(typePriceRepository.findByName(taskRequest.getTypePrice())
                .orElseThrow(() -> new NotFoundException("TypePrice", Long.valueOf(0))));

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskRequest taskRequest, String token) throws NotFoundException, NoAccessException {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);
        Task task = getTaskById(id, userId);

        if(!(jwtService.extractRoles(token).contains("ROLE_ADMIN")
            || task.getCreatedBy().equals(userId))
        ) {
            throw new NoAccessException("task", id);
        }

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setNameAuthor(jwtService.extractUserName(token));
        task.setTags(taskRequest.getTags());
        task.setPrice(taskRequest.getPrice());
        task.setTypePrice(typePriceRepository.findByName(taskRequest.getTypePrice())
                .orElseThrow(() -> new NotFoundException("TypePrice", Long.valueOf(0))));

        return taskRepository.save(task);
    }

    public void deleteTask(Long id, String token) throws NotFoundException, NoAccessException {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);
        Task task = getTaskById(id, userId);

        if(jwtService.extractRoles(token).contains("ROLE_ADMIN")
            || task.getCreatedBy().equals(userId)
        ) {
            taskRepository.deleteById(id);
        }
    }
}
