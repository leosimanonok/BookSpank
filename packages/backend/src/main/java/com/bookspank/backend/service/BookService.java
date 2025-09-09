package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.model.Book;

public interface BookService {
    public List<Book> getBooks(Integer offset, Integer limit);

}
