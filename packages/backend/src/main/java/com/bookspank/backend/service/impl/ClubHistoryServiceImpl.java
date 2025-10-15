package com.bookspank.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookspank.backend.model.ClubHistoryEntry;
import com.bookspank.backend.repository.ClubHistoryRespository;
import com.bookspank.backend.service.ClubHistoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubHistoryServiceImpl implements ClubHistoryService {

    private final ClubHistoryRespository respository;

    @Override
    public List<ClubHistoryEntry> getClubHistory(Integer limit, Integer offset) {
        return respository.getClubHistory(limit, offset);
    }

    @Override
    public Optional<ClubHistoryEntry> getCurrent() {
        return respository.getCurrent();
    }
}
