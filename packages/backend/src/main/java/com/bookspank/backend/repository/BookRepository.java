package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Books.BOOKS;

@Repository
public class BookRepository {

    private final DSLContext dsl;

    public BookRepository(DSLContext dsl) {
        this.dsl = dsl;
    }

    public void getAllBooks() {
        return this.dsl
                .select(BOOKS.ID, BOOKS.TITLE, BOOKS.AUTHOR, BOOKS.ISBN, BOOKS.STARTED, BOOKS.FINISHED, BOOKS.OLID)
                .fetch();
    }

}
