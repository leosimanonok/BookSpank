package com.bookspank.backend.controller;

import java.util.List;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookspank.backend.dto.PostBookRequest;
import com.bookspank.backend.dto.UpdateBookPositionRequest;
import com.bookspank.backend.model.ReadingListEntry;
import com.bookspank.backend.service.ReadingListService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/readingList")
public class ReadingListController {

    @GetMapping("/user/{userId}")
    public List<ReadingListEntry> getReadingList(
            @PathVariable @NotNull Integer userId,
            @RequestParam @Min(1) Integer limit,
            @RequestParam @Min(0) Integer offset) {
        return service.getReadingList(userId, limit, offset);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addBook(
            @PathVariable @NotNull Integer userId,
            @RequestBody @Valid PostBookRequest postBookForm) {

        try {
            service.addBook(userId, postBookForm);
            return ResponseEntity.status(HttpStatus.CREATED).body("Book added to reading list successfully.");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Book already exists in reading list.");
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> removeBook(
            @PathVariable @NotNull Integer userId,
            @RequestBody @NotNull Integer bookId) {
        service.removeBook(userId, bookId);
        return ResponseEntity.status(HttpStatus.OK).body("Book removed from reading list successfully.");
    }

    @PatchMapping("/user/{userId}")
    public ResponseEntity<?> updateBookPosition(
            @PathVariable @NotNull Integer userId,
            @RequestBody @Valid UpdateBookPositionRequest req) {
        service.updateBookPosition(userId, req.getBookId(), req.getOrigPosition(), req.getNewPosition());
        return ResponseEntity.status(HttpStatus.OK).body("Book position updated successfully.");
    }

    private final ReadingListService service;

}
