package com.bookspank.backend.model;

import lombok.Data;

import java.util.HashMap;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ReadingList {
    private HashMap<Integer, Book> books;
    private Integer userId;
}
