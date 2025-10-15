package com.bookspank.backend.repository;

import static com.bookspank.jooq.tables.ReadingListEntries.READING_LIST_ENTRIES;
import static com.bookspank.jooq.tables.Books.BOOKS;

import java.util.List;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

import com.bookspank.backend.model.ReadingListEntry;
import com.bookspank.backend.model.Book;

@Repository
@RequiredArgsConstructor
public class ReadingListRespository {
    private final DSLContext dsl;

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

}
