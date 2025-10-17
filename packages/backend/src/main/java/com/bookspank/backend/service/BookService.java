package com.bookspank.backend.service;

import java.util.List;
import java.util.Optional;

import com.bookspank.backend.dto.PostBookForm;
import com.bookspank.backend.model.Book;

public interface BookService {
    public List<Book> getBooks(Integer limit, Integer offset);

    public List<Book> getCompletedBooks(Integer limit, Integer offset);

    public List<Book> getUserBooks(Integer userId, Integer limit, Integer offset);

    public void postUserBook(Integer userId, PostBookForm form);

    public Optional<Book> getCurrentBook();

}
