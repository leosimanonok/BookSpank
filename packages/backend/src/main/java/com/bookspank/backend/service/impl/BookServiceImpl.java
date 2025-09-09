package com.bookspank.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.repository.BookRepository;
import com.bookspank.backend.service.BookService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public List<Book> getBooks(Integer offset, Integer limit) {
        return this.bookRepository.getBooks(offset, limit);
    }

}
