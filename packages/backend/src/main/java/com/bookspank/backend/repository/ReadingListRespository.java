package com.bookspank.backend.repository;

import static com.bookspank.jooq.tables.ReadingListEntries.READING_LIST_ENTRIES;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;

import org.jooq.DSLContext;
import org.jooq.exception.DataAccessException;
import org.jooq.impl.DSL;
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
                                READING_LIST_ENTRIES.POSITION,
                                BOOKS.AUTHOR,
                                BOOKS.TITLE,
                                BOOKS.COVER_ID,
                                BOOKS.ID)
                                .from(READING_LIST_ENTRIES)
                                .innerJoin(BOOKS)
                                .on(READING_LIST_ENTRIES.BOOK_ID.eq(BOOKS.ID))
                                .orderBy(READING_LIST_ENTRIES.POSITION.asc())
                                .limit(limit)
                                .offset(offset)
                                .fetch(record -> new ReadingListEntry(
                                                new Book(
                                                                record.get(BOOKS.ID),
                                                                record.get(BOOKS.TITLE),
                                                                record.get(BOOKS.AUTHOR),
                                                                record.get(BOOKS.COVER_ID)),
                                                record.get(READING_LIST_ENTRIES.POSITION)));
        }

        /**
         * Might need to rethink if we end up with a lot of books...
         * 
         * @param userId
         * @param bookId
         */
        public void addBook(Integer userId, Integer bookId) {

                Integer maxPosition = dsl.select(DSL.max(READING_LIST_ENTRIES.POSITION))
                                .from(READING_LIST_ENTRIES)
                                .where(READING_LIST_ENTRIES.USER_ID.eq(userId))
                                .fetchOneInto(Integer.class);

                Integer nextPosition = (maxPosition == null) ? 1 : maxPosition + 1;

                try {
                        this.dsl.insertInto(READING_LIST_ENTRIES)
                                        .set(READING_LIST_ENTRIES.USER_ID, userId)
                                        .set(READING_LIST_ENTRIES.BOOK_ID, bookId)
                                        .set(READING_LIST_ENTRIES.POSITION, nextPosition)
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

        public void updateBookPosition(Integer userId, Integer bookId, Integer origPosition, Integer newPosition) {
                // if moving up in list, ie decreasing position integer (pos 5 -> pos 1), need
                // to increment position of elem 1,2,3,4
                // in other words where position < origPosition && position >= newPosition

                // if moving down in list, ie increasing position integer (pos 1 -> pos 5), need
                // to decrement position of elem 2,3,4,5
                // in other words where position > origPosition && position <= newPosition

                if (newPosition < origPosition) {
                        this.dsl.update(READING_LIST_ENTRIES)
                                        .set(READING_LIST_ENTRIES.POSITION, READING_LIST_ENTRIES.POSITION.plus(1))
                                        .where(READING_LIST_ENTRIES.USER_ID.eq(userId)
                                                        .and(READING_LIST_ENTRIES.POSITION.ge(newPosition))
                                                        .and(READING_LIST_ENTRIES.POSITION.lt(origPosition)))
                                        .execute();
                } else if (newPosition > origPosition) {
                        this.dsl.update(READING_LIST_ENTRIES)
                                        .set(READING_LIST_ENTRIES.POSITION, READING_LIST_ENTRIES.POSITION.minus(1))
                                        .where(READING_LIST_ENTRIES.USER_ID.eq(userId)
                                                        .and(READING_LIST_ENTRIES.POSITION.gt(origPosition))
                                                        .and(READING_LIST_ENTRIES.POSITION.le(newPosition)))
                                        .execute();
                }

                // Finally, move the book itself:
                this.dsl.update(READING_LIST_ENTRIES)
                                .set(READING_LIST_ENTRIES.POSITION, newPosition)
                                .where(READING_LIST_ENTRIES.USER_ID.eq(userId)
                                                .and(READING_LIST_ENTRIES.BOOK_ID.eq(bookId)))
                                .execute();
        }

        private final DSLContext dsl;

}
