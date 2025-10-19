package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.dto.PostBookRequest;
import com.bookspank.backend.model.ReadingListEntry;

public interface ReadingListService {

    public List<ReadingListEntry> getReadingList(Integer userId, Integer limit, Integer offset);

    public void addBook(Integer userId, PostBookRequest form);

    public void removeBook(Integer userId, Integer bookId);

    public void updateWantToReadNext(Integer userId, Integer bookId, Boolean wantToReadNext);
}
