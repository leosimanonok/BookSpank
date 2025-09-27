package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.service.BookService;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> getBooks(
            @RequestParam @Min(1) Integer limit,
            @RequestParam @Min(0) Integer offset) {
        return this.bookService.getBooks(limit, offset);
    }

    @GetMapping("/completed")
    public List<Book> getCompletedBooks(
            @RequestParam @Min(1) Integer limit,
            @RequestParam @Min(0) Integer offset) {
        return this.bookService.getCompletedBooks(limit, offset);
    }

    @GetMapping("/user/{userId}")
    public List<Book> getUserBooks(
            @PathVariable @NotNull Integer userId,
            @RequestParam @Min(1) Integer limit,
            @RequestParam @Min(0) Integer offset) {
        return bookService.getUserBooks(userId, limit, offset);
    }

}
