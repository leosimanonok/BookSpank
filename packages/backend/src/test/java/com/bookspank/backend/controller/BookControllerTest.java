package com.bookspank.backend.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.service.BookService;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void testGetBooks_success() throws Exception {
        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book(1, "MockTitle", "MockAuthor", 100, 1));

        when(bookService.getBooks(10, 0)).thenReturn(bookList);

        mockMvc.perform(get("/books")
                .param("offset", "0")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(bookList.get(0).getTitle()))
                .andExpect(jsonPath("$[0].author").value(bookList.get(0).getAuthor()));
    }

    @Test
    void testGetBooks_missingParams() throws Exception {
        mockMvc.perform(get("/books")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetBooks_invalidOffset() throws Exception {
        mockMvc.perform(get("/books")
                .param("offset", "-1")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetBooks_invalidLimit() throws Exception {
        mockMvc.perform(get("/books")
                .param("offset", "10")
                .param("limit", "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetCompletedBooks_success() throws Exception {
        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book(1, "MockTitle", "MockAuthor", 100, 1, LocalDate.now(),
                LocalDate.now().plusDays(10)));

        when(bookService.getCompletedBooks(10, 0)).thenReturn(bookList);

        mockMvc.perform(get("/books/completed")
                .param("offset", "0")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(bookList.get(0).getTitle()))
                .andExpect(jsonPath("$[0].author").value(bookList.get(0).getAuthor()));
    }

    @Test
    void testGetCompletedBooks_invalidOffset() throws Exception {
        mockMvc.perform(get("/books/completed")
                .param("offset", "-1")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetCompletedBooks_invalidLimit() throws Exception {
        mockMvc.perform(get("/books/completed")
                .param("offset", "10")
                .param("limit", "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetUserBooks_nullUserId() throws Exception {
        mockMvc.perform(get("/books/user/")
                .param("offset", "0")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void testGetUserBooks_invalidOffset() throws Exception {
        mockMvc.perform(get("/books/user/1")
                .param("offset", "-1")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetUserBooks_invalidLimit() throws Exception {
        mockMvc.perform(get("/books/user/1")
                .param("offset", "10")
                .param("limit", "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetUserBooks_success() throws Exception {
        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book(1, "MockTitle", "MockAuthor", 100, 1, LocalDate.now(),
                LocalDate.now().plusDays(10)));

        when(bookService.getUserBooks(1, 10, 0)).thenReturn(bookList);

        mockMvc.perform(get("/books/user/1")
                .param("offset", "0")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(bookList.get(0).getTitle()))
                .andExpect(jsonPath("$[0].author").value(bookList.get(0).getAuthor()));
    }

}
