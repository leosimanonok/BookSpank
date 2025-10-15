package com.bookspank.backend.service;

import java.util.List;

import com.bookspank.backend.model.ClubHistoryEntry;

public interface ClubHistoryService {
    public List<ClubHistoryEntry> getClubHistory(Integer limit, Integer offset);
}
