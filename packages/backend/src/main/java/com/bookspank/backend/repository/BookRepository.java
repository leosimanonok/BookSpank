package com.bookspank.backend.repository;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;
import java.util.Optional;

import com.bookspank.backend.dto.PostBookForm;
import com.bookspank.backend.model.Book;

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

        public List<Book> getBooks(Integer limit, Integer offset) {
                return this.dsl
                                .select(
                                                BOOKS.ID,
                                                BOOKS.TITLE,
                                                BOOKS.AUTHOR,
                                                BOOKS.STARTED,
                                                BOOKS.FINISHED,
                                                BOOKS.SELECTED_BY)
                                .from(BOOKS)
                                .limit(limit)
                                .offset(offset)
                                .fetch()
                                .map(record -> new Book(
                                                record.get(BOOKS.ID),
                                                record.get(BOOKS.TITLE),
                                                record.get(BOOKS.AUTHOR),
                                                record.get(BOOKS.COVER_ID),
                                                record.get(BOOKS.SELECTED_BY),
                                                record.get(BOOKS.STARTED),
                                                record.get(BOOKS.FINISHED)));
        }

        public List<Book> getCompletedBooks(Integer limit, Integer offset) {
                return this.dsl
                                .select(
                                                BOOKS.ID,
                                                BOOKS.TITLE,
                                                BOOKS.AUTHOR,
                                                BOOKS.COVER_ID,
                                                BOOKS.STARTED,
                                                BOOKS.FINISHED,
                                                BOOKS.SELECTED_BY)
                                .from(BOOKS)
                                .where(BOOKS.STARTED.isNotNull(), BOOKS.FINISHED.isNotNull())
                                .orderBy(BOOKS.FINISHED.desc(), BOOKS.ID.asc())
                                .limit(limit)
                                .offset(offset)
                                .fetch()
                                .map(record -> new Book(
                                                record.get(BOOKS.ID),
                                                record.get(BOOKS.TITLE),
                                                record.get(BOOKS.AUTHOR),
                                                record.get(BOOKS.COVER_ID),
                                                record.get(BOOKS.SELECTED_BY),
                                                record.get(BOOKS.STARTED),
                                                record.get(BOOKS.FINISHED)));
        }

        public List<Book> getUserBooks(Integer userId, Integer limit, Integer offset) {
                return this.dsl
                                .select(
                                                BOOKS.ID,
                                                BOOKS.TITLE,
                                                BOOKS.AUTHOR,
                                                BOOKS.COVER_ID,
                                                BOOKS.STARTED,
                                                BOOKS.FINISHED,
                                                BOOKS.SELECTED_BY)
                                .from(BOOKS)
                                .where(BOOKS.SELECTED_BY.eq(userId))
                                .limit(limit)
                                .offset(offset)
                                .fetch()
                                .map(record -> new Book(
                                                record.get(BOOKS.ID),
                                                record.get(BOOKS.TITLE),
                                                record.get(BOOKS.AUTHOR),
                                                record.get(BOOKS.COVER_ID),
                                                record.get(BOOKS.SELECTED_BY),
                                                record.get(BOOKS.STARTED),
                                                record.get(BOOKS.FINISHED)));
        }

        public void postUserBook(Integer userId, PostBookForm form) {
                try {
                        this.dsl
                                        .insertInto(BOOKS)
                                        .set(BOOKS.SELECTED_BY, userId)
                                        .set(BOOKS.TITLE, form.getTitle())
                                        .set(BOOKS.AUTHOR, form.getAuthor())
                                        .set(BOOKS.COVER_ID, form.getCover_id()) // nullable
                                        .execute();
                } catch (DataAccessException e) {
                        if (e.getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
                                // Duplicate entry detected
                                throw new DuplicateKeyException("Book already exists", e);
                        }
                        throw e; // rethrow other exceptions
                }
        }

        public Optional<Book> getCurrentBook() {
                return this.dsl
                                .select(
                                                BOOKS.ID,
                                                BOOKS.TITLE,
                                                BOOKS.AUTHOR,
                                                BOOKS.COVER_ID,
                                                BOOKS.COVER_ID,
                                                BOOKS.STARTED,
                                                BOOKS.FINISHED,
                                                BOOKS.SELECTED_BY)
                                .from(BOOKS)
                                .where(BOOKS.STARTED.isNotNull(), BOOKS.FINISHED.isNull())
                                .fetchOptionalInto(Book.class);
        }

}
