package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.model.Book;

public interface BookService {
    public List<Book> getAllBooks(Integer offset, Integer limit);

}
