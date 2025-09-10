package com.bookspank.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.repository.BookRepository;
import com.bookspank.backend.service.impl.BookServiceImpl;

public class BookServiceTest {

    private BookRepository bookRepository;
    private BookServiceImpl bookService;

    @BeforeEach
    void setUp() {
        bookRepository = mock(BookRepository.class);
        bookService = new BookServiceImpl(bookRepository);
    }

    @Test
    void testGetBooks_empty() {
        List<Book> books = new ArrayList<Book>();

        when(bookRepository.getBooks(10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getBooks(10, 0);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetBooks() {
        List<Book> books = new ArrayList<Book>();

        books.add(new Book());
        books.add(new Book());

        when(bookRepository.getBooks(10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getBooks(10, 0);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(books.size(), result.size());
    }

    @Test
    void testGetCompletedBooks_empty() {
        List<Book> books = new ArrayList<Book>();

        when(bookRepository.getCompletedBooks(10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getCompletedBooks(10, 0);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetCompletedBooks() {
        List<Book> books = new ArrayList<Book>();

        books.add(new Book());
        books.add(new Book());

        when(bookRepository.getCompletedBooks(10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getCompletedBooks(10, 0);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(books.size(), result.size());
    }

    @Test
    void testGetUserBooks_empty() {
        List<Book> books = new ArrayList<Book>();

        when(bookRepository.getUserBooks(1, 10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getUserBooks(1, 10, 0);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetUserBooks() {
        List<Book> books = new ArrayList<Book>();

        books.add(new Book());
        books.add(new Book());

        when(bookRepository.getUserBooks(1, 10, 0))
                .thenReturn(books);

        List<Book> result = bookService.getUserBooks(1, 10, 0);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(books.size(), result.size());
    }

}
