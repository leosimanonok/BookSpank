package com.bookspank.backend.model;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private Integer id;
    private String title;
    private String author;
    private String isbn;
    private String olid;
    private LocalDate started;
    private LocalDate finished;

    public Book(Integer id, String title, String author, String isbn, String olid) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;
    }

    public Book(Integer id, String title, String author, String isbn, String olid, LocalDate started) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;
        this.started = started;
    }

    public boolean inProgress() {
        return this.started != null && this.finished == null;
    }

}
