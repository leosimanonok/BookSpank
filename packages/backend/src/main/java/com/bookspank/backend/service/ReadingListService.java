package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.model.ReadingListEntry;

public interface ReadingListService {

    public List<ReadingListEntry> getReadingList(Integer userId, Integer limit, Integer offset);

}
