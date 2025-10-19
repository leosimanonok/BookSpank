package com.bookspank.backend.repository;

import static com.bookspank.jooq.tables.ReadingListEntries.READING_LIST_ENTRIES;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;

import org.jooq.DSLContext;
import org.jooq.exception.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

import com.bookspank.backend.model.ReadingListEntry;
import com.bookspank.backend.model.Book;

@Repository
@RequiredArgsConstructor
public class ReadingListRespository {

        public List<ReadingListEntry> getReadingList(Integer userId, Integer limit, Integer offset) {
                return this.dsl.select(
                                READING_LIST_ENTRIES.WANT_TO_READ_NEXT,
                                BOOKS.AUTHOR,
                                BOOKS.TITLE,
                                BOOKS.COVER_ID,
                                BOOKS.ID)
                                .from(READING_LIST_ENTRIES)
                                .innerJoin(BOOKS)
                                .on(READING_LIST_ENTRIES.BOOK_ID.eq(BOOKS.ID))
                                .limit(limit)
                                .offset(offset)
                                .fetch(record -> new ReadingListEntry(
                                                new Book(
                                                                record.get(BOOKS.ID),
                                                                record.get(BOOKS.TITLE),
                                                                record.get(BOOKS.AUTHOR),
                                                                record.get(BOOKS.COVER_ID)),
                                                record.get(READING_LIST_ENTRIES.WANT_TO_READ_NEXT)));
        }

        /**
         * Might need to rethink if we end up with a lot of books...
         * 
         * @param userId
         * @param bookId
         */
        public void addBook(Integer userId, Integer bookId) {

                try {
                        this.dsl.insertInto(READING_LIST_ENTRIES)
                                        .set(READING_LIST_ENTRIES.USER_ID, userId)
                                        .set(READING_LIST_ENTRIES.BOOK_ID, bookId)
                                        .execute();
                } catch (DataAccessException e) {
                        if (e.getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
                                // Duplicate entry detected
                                throw new DuplicateKeyException("Book already exists", e);
                        }
                        throw e; // rethrow other exceptions
                }

        }

        public void removeBook(Integer userId, Integer bookId) {
                this.dsl.deleteFrom(READING_LIST_ENTRIES)
                                .where(
                                                READING_LIST_ENTRIES.USER_ID.eq(userId)
                                                                .and(READING_LIST_ENTRIES.BOOK_ID.eq(bookId)))
                                .execute();
        }

        // TODO: How do we want to enforce a certain number of books which can be in
        // want to read next state?
        public void updateWantToReadNext(Integer userId, Integer bookId, Boolean wantToReadNext) {
                this.dsl.update(READING_LIST_ENTRIES)
                                .set(READING_LIST_ENTRIES.WANT_TO_READ_NEXT, wantToReadNext)

                                .where(READING_LIST_ENTRIES.USER_ID.eq(userId)
                                                .and(READING_LIST_ENTRIES.BOOK_ID.eq(bookId)))
                                .execute();
        }

        private final DSLContext dsl;
}
