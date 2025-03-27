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

import java.util.*;

@CrossOrigin("")
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

    @GetMapping("/id/{taskName}")
    public ResponseEntity<?> getTaskIdByName(@PathVariable String taskName,
                                             @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        Optional<Task> task = taskService.getTaskByName(taskName, user);

        if (task.isPresent()) {
            Task foundTask = task.get();
            System.out.println("Found Task: " + foundTask);  // Debugging log
            return ResponseEntity.ok(Collections.singletonMap("taskId", foundTask.getTaskId()));
            // Ensure getTaskId() matches your entity field name
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
    }


    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable int taskId,
                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        Optional<Task> taskOptional = taskService.getTaskById(taskId);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (!Objects.equals(task.getUser().getId(), user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only access your own tasks");
            }
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
    }

    // 1. Get tasks sorted by priority (High > Medium > Low)
    @GetMapping("/sorted/priority")
    public ResponseEntity<List<Task>> getTasksSortedByPriority(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByUser(user);

        // Sorting by priority
        tasks.sort((task1, task2) -> comparePriority(task1.getPriority(), task2.getPriority()));

        return ResponseEntity.ok(tasks);
    }

    // 2. Get tasks sorted by due date (Earliest first)
    @GetMapping("/sorted/due-date")
    public ResponseEntity<List<Task>> getTasksSortedByDueDate(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksByUser(user);

        // Sorting by due date (earliest first)
        tasks.sort(Comparator.comparing(Task::getDeadline));

        return ResponseEntity.ok(tasks);
    }

    // Helper method to compare priority
    private int comparePriority(String priority1, String priority2) {
        List<String> priorityOrder = List.of("High", "Medium", "Low");
        return Integer.compare(priorityOrder.indexOf(priority1), priorityOrder.indexOf(priority2));
    }

    @GetMapping("/last7days")
    public ResponseEntity<List<Task>> getLast7DaysTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Task> tasks = taskService.getTasksForLast7Days(user);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getTaskStatistics(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        Map<String, Long> stats = taskService.getTaskStatistics(user);

        return ResponseEntity.ok(stats);
    }
    
}
