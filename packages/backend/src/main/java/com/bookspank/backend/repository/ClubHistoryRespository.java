package com.bookspank.backend.repository;

import com.bookspank.backend.dto.CompleteBookRequest;
import com.bookspank.backend.model.Book;
import com.bookspank.backend.model.ClubHistoryEntry;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

import static com.bookspank.jooq.tables.ClubHistory.CLUB_HISTORY;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Repository
@RequiredArgsConstructor
public class ClubHistoryRespository {

        public List<ClubHistoryEntry> getClubHistory(Integer limit, Integer offset) {
                return this.dsl.select(
                                CLUB_HISTORY.ID,
                                CLUB_HISTORY.SELECTED_BY,
                                CLUB_HISTORY.STARTED,
                                CLUB_HISTORY.FINISHED,
                                BOOKS.AUTHOR,
                                BOOKS.TITLE,
                                BOOKS.COVER_ID,
                                BOOKS.ID)
                                .from(CLUB_HISTORY)
                                .innerJoin(BOOKS)
                                .on(CLUB_HISTORY.BOOK_ID.eq(BOOKS.ID))
                                .orderBy(CLUB_HISTORY.FINISHED.desc())
                                .limit(limit)
                                .offset(offset)
                                .fetch(record -> new ClubHistoryEntry(
                                                record.get(CLUB_HISTORY.ID),
                                                new Book(
                                                                record.get(BOOKS.ID),
                                                                record.get(BOOKS.TITLE),
                                                                record.get(BOOKS.AUTHOR),
                                                                record.get(BOOKS.COVER_ID)),
                                                record.get(CLUB_HISTORY.SELECTED_BY),
                                                record.get(CLUB_HISTORY.STARTED),
                                                record.get(CLUB_HISTORY.FINISHED)));
        }

        public Optional<ClubHistoryEntry> getCurrent() {
                return this.dsl.select(CLUB_HISTORY.ID,
                                CLUB_HISTORY.SELECTED_BY,
                                CLUB_HISTORY.STARTED,
                                CLUB_HISTORY.FINISHED,
                                BOOKS.AUTHOR,
                                BOOKS.TITLE,
                                BOOKS.COVER_ID,
                                BOOKS.ID)
                                .from(CLUB_HISTORY)
                                .innerJoin(BOOKS)
                                .on(CLUB_HISTORY.BOOK_ID.eq(BOOKS.ID))
                                .where(CLUB_HISTORY.STARTED.isNotNull(), CLUB_HISTORY.FINISHED.isNull())
                                .fetchOptional(record -> new ClubHistoryEntry(
                                                record.get(CLUB_HISTORY.ID),
                                                new Book(
                                                                record.get(BOOKS.ID),
                                                                record.get(BOOKS.TITLE),
                                                                record.get(BOOKS.AUTHOR),
                                                                record.get(BOOKS.COVER_ID)),
                                                record.get(CLUB_HISTORY.SELECTED_BY),
                                                record.get(CLUB_HISTORY.STARTED),
                                                record.get(CLUB_HISTORY.FINISHED)));
        }

        public Optional<ClubHistoryEntry> completeBook(CompleteBookRequest form) {
                this.dsl.update(CLUB_HISTORY)
                                .set(CLUB_HISTORY.FINISHED, LocalDate.now())
                                .where(CLUB_HISTORY.BOOK_ID.eq(form.getBookId())
                                                .and(CLUB_HISTORY.FINISHED.isNotNull()))
                                .execute();

                return this.dsl.select(CLUB_HISTORY.ID,
                                CLUB_HISTORY.SELECTED_BY,
                                CLUB_HISTORY.STARTED,
                                CLUB_HISTORY.FINISHED,
                                BOOKS.AUTHOR,
                                BOOKS.TITLE,
                                BOOKS.COVER_ID,
                                BOOKS.ID)
                                .from(CLUB_HISTORY)
                                .innerJoin(BOOKS)
                                .on(CLUB_HISTORY.BOOK_ID.eq(BOOKS.ID))
                                .where(CLUB_HISTORY.BOOK_ID.eq(form.getBookId()))
                                .fetchOptional(record -> new ClubHistoryEntry(
                                                record.get(CLUB_HISTORY.ID),
                                                new Book(
                                                                record.get(BOOKS.ID),
                                                                record.get(BOOKS.TITLE),
                                                                record.get(BOOKS.AUTHOR),
                                                                record.get(BOOKS.COVER_ID)),
                                                record.get(CLUB_HISTORY.SELECTED_BY),
                                                record.get(CLUB_HISTORY.STARTED),
                                                record.get(CLUB_HISTORY.FINISHED)));

        }

        private final DSLContext dsl;

}
