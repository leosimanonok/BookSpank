package com.bookspank.backend.model;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ReadingListEntry {
    private Integer position;
    private Book book;
}
