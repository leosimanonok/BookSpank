package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;
import java.util.Optional;

import com.bookspank.backend.dto.PostBookForm;

import lombok.RequiredArgsConstructor;

import org.jooq.exception.DataAccessException;
import org.springframework.dao.DuplicateKeyException;

@Repository
@RequiredArgsConstructor
public class BookRepository {

        public Integer getIdFromTitleAndAuthor(String title, String author) {
                return this.dsl.select(BOOKS.ID)
                                .from(BOOKS)
                                .where(BOOKS.TITLE.eq(title))
                                .and(BOOKS.AUTHOR.eq(author))
                                .fetchOneInto(Integer.class);
        }

        /**
         * 
         * @param form
         * @return inserted bookId
         */
        public Integer addBook(PostBookForm form) {
                try {
                        return this.dsl.insertInto(BOOKS)
                                        .set(BOOKS.TITLE, form.getTitle())
                                        .set(BOOKS.AUTHOR, form.getAuthor())
                                        .set(BOOKS.COVER_ID, form.getCover_id()) // nullable
                                        .returning(BOOKS.ID)
                                        .execute();
                } catch (DataAccessException e) {
                        if (e.getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
                                // Duplicate entry detected
                                throw new DuplicateKeyException("Book already exists", e);
                        }
                        throw e; // rethrow other exceptions
                }

        }

        private final DSLContext dsl;
}
