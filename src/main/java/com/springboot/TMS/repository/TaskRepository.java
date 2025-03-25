package com.springboot.TMS.repository;

import com.springboot.TMS.entity.Task;
import com.springboot.TMS.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUser(User user);
    List<Task> findByUserAndCategory(User user, String category);

    List<Task> findByUserAndPriority(User user, String priority);

    List<Task> findByUserAndCompletionStatus(User user, boolean completionStatus);

    List<Task> findByUserAndDateOfCreation(User user, LocalDate dateOfCreation);

}