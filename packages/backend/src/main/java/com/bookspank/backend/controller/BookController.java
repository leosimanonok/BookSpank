package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.service.BookService;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    // Spring automatically injects BookService here
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getBooks(
            @RequestParam Integer offset,
            @RequestParam Integer limit) {
        return this.bookService.getBooks(offset, limit);
    }

}
