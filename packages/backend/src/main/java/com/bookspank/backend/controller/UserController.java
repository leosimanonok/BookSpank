package com.bookspank.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;
import com.bookspank.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    // GET /user
    /**
     * Used by login flow to make sure user exists
     * 
     * @param id
     * @return
     */
    @GetMapping
    public User getUser(@RequestParam String email) {
        return this.userService.getUser(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PatchMapping
    public User updateUser(@Valid @RequestBody UpdateUserForm form) {
        return this.userService.updateUsername(form)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

}
