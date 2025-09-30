package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.model.Book;

public interface BookService {
    public List<Book> getBooks(Integer limit, Integer offset);

    public List<Book> getCompletedBooks(Integer limit, Integer offset);

    public List<Book> getUserBooks(Integer userId, Integer limit, Integer offset);

    public Book getCurrentBook();

}
