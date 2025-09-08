package com.bookspank.backend.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String olid;
    private Date started;
    private Date finished;

    public boolean inProgress() {
        return this.started && !this.finished;
    }
}
