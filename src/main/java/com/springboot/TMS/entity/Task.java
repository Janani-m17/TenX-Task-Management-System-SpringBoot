package com.springboot.TMS.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskId;

    private String name;
    private String description;
    @Column(name = "date_of_creation")
    private LocalDate dateOfCreation;
    private Date deadline;
    private String priority;
    private String category;
    private int completedPart = 0;
    private boolean completionStatus = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Task() {
    }

    public Task(int taskId, String name, String description, Date dateOfCreation, Date deadline, String priority, String category, int completedPart, boolean completionStatus, User user) {
        this.taskId = taskId;
        this.name = name;
        this.description = description;
        this.dateOfCreation = LocalDate.now();
        this.deadline = deadline;
        this.priority = priority;
        this.category = category;
        this.completedPart = completedPart;
        this.completionStatus = completionStatus;
        this.user = user;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(Date dateOfCreation) {
        this.dateOfCreation = LocalDate.now();
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getCompletedPart() {
        return completedPart;
    }

    public void setCompletedPart(int completedPart) {
        this.completedPart = completedPart;
    }

    public boolean isCompletionStatus() {
        return completionStatus;
    }

    public void setCompletionStatus(boolean completionStatus) {
        this.completionStatus = completionStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}