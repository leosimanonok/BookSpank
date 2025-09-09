package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.service.BookService;

@RestController
@RequestMapping("/user")

public class BookController {

    private final BookService bookService;

    // Spring automatically injects BookService here
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/")
    public List<Book> index() {

        // TODO: Add params
        List<Book> bookList = this.bookService.getAllBooks(10, 0);
        System.out.println("Testing logging");

        return bookList;
    }

}
