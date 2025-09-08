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

    public boolean inProgress() {
        return this.started != null && this.finished == null;
    }

}
