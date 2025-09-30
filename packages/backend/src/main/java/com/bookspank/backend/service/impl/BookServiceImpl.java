package com.bookspank.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookspank.backend.dto.PostBookForm;
import com.bookspank.backend.model.Book;
import com.bookspank.backend.repository.BookRepository;
import com.bookspank.backend.service.BookService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<Book> getBooks(Integer limit, Integer offset) {
        return this.bookRepository.getBooks(limit, offset);
    }

    @Override
    public List<Book> getCompletedBooks(Integer limit, Integer offset) {
        return this.bookRepository.getCompletedBooks(limit, offset);
    }

    @Override
    public List<Book> getUserBooks(Integer userId, Integer limit, Integer offset) {
        return this.bookRepository.getUserBooks(userId, limit, offset);
    }

    @Override
    public void postUserBook(Integer userId, PostBookForm form) {
        this.bookRepository.postUserBook(userId, form);
    }

}
