package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;

import com.bookspank.backend.model.Book;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookRepository {

    private final DSLContext dsl;

    public List<Book> getAllBooks(Integer offset, Integer limit) {
        return this.dsl
                .select(BOOKS.ID, BOOKS.TITLE, BOOKS.AUTHOR, BOOKS.ISBN, BOOKS.STARTED, BOOKS.FINISHED, BOOKS.OLID)
                .from(BOOKS)
                .limit(limit)
                .offset(offset)
                .fetch()
                .map(record -> new Book(
                        record.get(BOOKS.ID),
                        record.get(BOOKS.TITLE),
                        record.get(BOOKS.AUTHOR),
                        record.get(BOOKS.ISBN),
                        record.get(BOOKS.OLID),
                        record.get(BOOKS.STARTED),
                        record.get(BOOKS.FINISHED)));
    }

}
