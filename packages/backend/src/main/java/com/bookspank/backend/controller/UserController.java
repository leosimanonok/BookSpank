package com.bookspank.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;
import com.bookspank.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    // GET /user/{email}
    /**
     * Used by login flow to make sure user exists
     * 
     * @param id
     * @return
     */
    @GetMapping("/{email}")
    public User getUserById(@PathVariable String email) {
        return this.userService.getUser(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PatchMapping("/")
    public User updateUser(@ModelAttribute UpdateUserForm form) {
        return this.userService.updateUsername(form)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

}
