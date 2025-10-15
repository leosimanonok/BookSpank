package com.bookspank.backend.repository;

import com.bookspank.backend.model.Book;
import com.bookspank.backend.model.ClubHistoryEntry;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

import static com.bookspank.jooq.tables.ClubHistory.CLUB_HISTORY;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ClubHistoryRespository {
    private final DSLContext dsl;

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
}
