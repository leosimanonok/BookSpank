package com.bookspank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return this.bookRepository.getAllBooks();
    }

}
