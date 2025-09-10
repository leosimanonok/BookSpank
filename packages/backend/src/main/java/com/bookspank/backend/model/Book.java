package com.bookspank.backend.model;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Book {
    private Integer id;
    private String title;
    private String author;
    private Integer cover_id;
    private LocalDate started;
    private LocalDate finished;
    private Integer selected_by;

    public Book(
            Integer id,
            String title,
            String author,
            Integer cover_id,
            Integer selected_by) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover_id = cover_id;
        this.selected_by = selected_by;
    }

    public Book(
            Integer id,
            String title,
            String author,
            Integer cover_id,
            Integer selected_by,
            LocalDate started) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover_id = cover_id;
        this.selected_by = selected_by;
        this.started = started;
    }

    public Book(
            Integer id,
            String title,
            String author,
            Integer cover_id,
            Integer selected_by,
            LocalDate started,
            LocalDate finished) {

        if (started == null || finished == null)
            throw new IllegalArgumentException("Start and finish dates cannot be null");

        if (started.isAfter(finished))
            throw new IllegalArgumentException("Start date must be before finish date");

        this.id = id;
        this.title = title;
        this.author = author;
        this.cover_id = cover_id;
        this.selected_by = selected_by;
        this.started = started;
        this.finished = finished;
    }
}
