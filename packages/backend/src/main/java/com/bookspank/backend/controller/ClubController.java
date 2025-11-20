package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bookspank.backend.service.ClubHistoryService;
import com.bookspank.backend.dto.CompleteBookRequest;
import com.bookspank.backend.model.ClubHistoryEntry;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {
    private final ClubHistoryService service;

    @GetMapping("/history")
    public List<ClubHistoryEntry> getClubHistory(
            @RequestParam @Min(1) Integer limit,
            @RequestParam @Min(0) Integer offset) {
        return this.service.getClubHistory(limit, offset);
    }

    @GetMapping("/current")
    public ClubHistoryEntry getCurrent() {
        return this.service.getCurrent()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No current book..."));
    }

    @PatchMapping("/current")
    public ClubHistoryEntry completeBook(
            @RequestBody @Valid CompleteBookRequest form) {
        return this.service.completeBook(form)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Current book not found..."));
    }
}
