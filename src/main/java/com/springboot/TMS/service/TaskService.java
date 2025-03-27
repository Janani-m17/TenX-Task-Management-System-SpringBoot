package com.springboot.TMS.service;

import com.springboot.TMS.entity.Task;
import com.springboot.TMS.entity.User;
import com.springboot.TMS.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getTasksByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskById(int taskId) {
        return taskRepository.findById(taskId);
    }

    public Task updateTask(Task updatedTask) {
        return taskRepository.save(updatedTask);
    }

    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

    public List<Task> getTasksByCategory(User user, String category) {
        return taskRepository.findByUserAndCategory(user, category);
    }

    public List<Task> getTasksByPriority(User user, String priority) {
        return taskRepository.findByUserAndPriority(user, priority);
    }

    public List<Task> getCompletedTasks(User user) {
        return taskRepository.findByUserAndCompletionStatus(user, true);
    }

    public List<Task> getInProgressTasks(User user) {
        return taskRepository.findByUserAndCompletionStatus(user, false);
    }

    public List<Task> getTasksByDate(User user, String date) {
        LocalDate localDate = LocalDate.parse(date); // Convert String to LocalDate
        return taskRepository.findByUserAndDateOfCreation(user, localDate);
    }

    public Optional<Task> getTaskByName(String name, User user) {
        return taskRepository.findByNameAndUser(name, user);
    }
}