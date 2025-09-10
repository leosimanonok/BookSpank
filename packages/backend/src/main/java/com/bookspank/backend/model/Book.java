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
    private String isbn;
    private String olid;
    private LocalDate started;
    private LocalDate finished;
    private Integer selectedBy;

    public Book(
            Integer id,
            String title,
            String author,
            String isbn,
            String olid,
            Integer selectedBy) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;
        this.selectedBy = selectedBy;
    }

    public Book(
            Integer id,
            String title,
            String author,
            String isbn,
            String olid,
            Integer selectedBy,
            LocalDate started) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;

        this.selectedBy = selectedBy;
        this.started = started;
    }

    public Book(
            Integer id,
            String title,
            String author,
            String isbn,
            String olid,
            Integer selectedBy,
            LocalDate started,
            LocalDate finished) {

        if (started == null || finished == null)
            throw new IllegalArgumentException("Start and finish dates cannot be null");

        if (started.isAfter(finished))
            throw new IllegalArgumentException("Start date must be before finish date");

        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;
        this.selectedBy = selectedBy;
        this.started = started;
        this.finished = finished;
    }
}
