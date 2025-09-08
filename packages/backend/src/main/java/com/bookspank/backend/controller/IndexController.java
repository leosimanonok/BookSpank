package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.service.BookService;

@RestController
public class IndexController {

    private final BookService bookService;

    // Spring automatically injects BookService here
    public IndexController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/")
    public List<Book> index() {

        List<Book> bookList = this.bookService.getAllBooks();

        return bookList;
    }

}
