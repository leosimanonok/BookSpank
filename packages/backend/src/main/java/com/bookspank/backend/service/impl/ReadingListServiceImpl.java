package com.bookspank.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookspank.backend.dto.PostBookRequest;
import com.bookspank.backend.model.ReadingListEntry;
import com.bookspank.backend.repository.BookRepository;
import com.bookspank.backend.repository.ReadingListRespository;
import com.bookspank.backend.service.ReadingListService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReadingListServiceImpl implements ReadingListService {

    @Override
    public List<ReadingListEntry> getReadingList(Integer userId, Integer limit, Integer offset) {
        return readingListRespository.getReadingList(userId, limit, offset);
    }

    @Override
    @Transactional
    public void addBook(Integer userId, PostBookRequest form) {
        Integer bookId = bookRepository.getIdFromTitleAndAuthor(form.getTitle(), form.getTitle());

        if (bookId == null) {
            System.out.printf("Adding {} to db", form.getTitle());
            bookId = bookRepository.addBook(form);
        }

        readingListRespository.addBook(userId, bookId);
    }

    @Override
    public void removeBook(Integer userId, Integer bookId) {
        // TODO: Maybe want to check if any other referenced to the bookId exist in
        // reading lists and delete if not?
        readingListRespository.removeBook(userId, bookId);
    }

    @Override
    public void updateWantToReadNext(Integer userId, Integer bookId, Boolean wantToReadNext) {
        readingListRespository.updateWantToReadNext(userId, bookId, wantToReadNext);
    }

    private final ReadingListRespository readingListRespository;
    private final BookRepository bookRepository;
}
