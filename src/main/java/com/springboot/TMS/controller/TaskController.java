package com.springboot.TMS.controller;

import com.springboot.TMS.config.CustomUserDetails;
import com.springboot.TMS.entity.Task;
import com.springboot.TMS.entity.User;
import com.springboot.TMS.service.TaskService;
import com.springboot.TMS.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task createdTask = taskService.createTask(task, user);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Task>> getUserTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        System.out.println("Authenticated User: " + userDetails.getUsername());

        // Fetch user entity from the database
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByUser(user);
        return ResponseEntity.ok(tasks);
    }


    @PutMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable int taskId,
                                        @RequestBody Task updatedTask,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        Optional<Task> existingTask = taskService.getTaskById(taskId);

        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            if (!Objects.equals(task.getUser().getId(), user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own tasks");
            }

            task.setName(updatedTask.getName());
            task.setDescription(updatedTask.getDescription());
            task.setDeadline(updatedTask.getDeadline());
            task.setPriority(updatedTask.getPriority());
            task.setCategory(updatedTask.getCategory());
            task.setCompletedPart(updatedTask.getCompletedPart());
            task.setCompletionStatus(updatedTask.isCompletionStatus());

            return ResponseEntity.ok(taskService.updateTask(task));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable int taskId,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        Optional<Task> taskOptional = taskService.getTaskById(taskId);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (!Objects.equals(task.getUser().getId(), user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own tasks");
            }
            taskService.deleteTask(taskId);
            return ResponseEntity.ok("Task deleted successfully!");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Task>> getTasksByCategory(@PathVariable String category,
                                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByCategory(user, category);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Task>> getTasksByPriority(@PathVariable String priority,
                                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByPriority(user, priority);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Task>> getCompletedTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getCompletedTasks(user);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/in-progress")
    public ResponseEntity<List<Task>> getInProgressTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getInProgressTasks(user);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Task>> getTasksByDate(@PathVariable String date,
                                                     @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByDate(user, date);
        return ResponseEntity.ok(tasks);
    }


}
