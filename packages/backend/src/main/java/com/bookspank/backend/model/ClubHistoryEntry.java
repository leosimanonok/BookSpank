package com.bookspank.backend.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClubHistoryEntry {
    private Integer id;
    private Book book;
    private Integer selected_by;
    private LocalDate started;
    private LocalDate finished;

    public ClubHistoryEntry(Integer id, Book book, Integer selected_by) {
        this.id = id;
        this.book = book;
        this.selected_by = selected_by;
    }

    public ClubHistoryEntry(Integer id, Book book, Integer selected_by, LocalDate started) {
        this.id = id;
        this.book = book;
        this.selected_by = selected_by;
        this.started = started;
    }
}
