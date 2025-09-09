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
    private BookService bookService; // injected into controller

    @Test
    void testGetBooks_success() throws Exception {
        List<Book> bookList = new ArrayList<Book>();
        bookList.add(new Book(1, "MockTitle", "MockAuthor", "MockISBN", "MockOLID"));

        when(bookService.getBooks(0, 10))
                .thenReturn(bookList);

        mockMvc.perform(get("/books")
                .param("offset", "0")
                .param("limit", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(bookList.get(0).getTitle()))
                .andExpect(jsonPath("$[0].author").value(bookList.get(0).getAuthor()));
    }

    @Test
    void testGetBooks_badRequest() throws Exception {

        mockMvc.perform(get("/books")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

}
