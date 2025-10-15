package com.bookspank.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookspank.backend.model.ReadingListEntry;
import com.bookspank.backend.repository.ReadingListRespository;
import com.bookspank.backend.service.ReadingListService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReadingListServiceImpl implements ReadingListService {

    @Override
    public List<ReadingListEntry> getReadingList(Integer userId, Integer limit, Integer offset) {
        return respository.getReadingList(userId, limit, offset);
    }

    private final ReadingListRespository respository;
}
