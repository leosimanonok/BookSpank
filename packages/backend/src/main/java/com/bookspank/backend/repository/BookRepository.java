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
                                .orderBy(BOOKS.FINISHED.desc())
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

        public Book getCurrentBook() {
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
                                .fetchOne()
                                .map(record -> new Book(
                                                record.get(BOOKS.ID),
                                                record.get(BOOKS.TITLE),
                                                record.get(BOOKS.AUTHOR),
                                                record.get(BOOKS.COVER_ID),
                                                record.get(BOOKS.SELECTED_BY),
                                                record.get(BOOKS.STARTED),
                                                record.get(BOOKS.FINISHED)));
        }

}
