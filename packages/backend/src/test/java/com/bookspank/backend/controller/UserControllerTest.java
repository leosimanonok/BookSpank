package com.bookspank.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;
import com.bookspank.backend.service.UserService;

@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService; // injected into controller

    @Test
    void testGetUser_success() throws Exception {
        User user = new User(1, "test@example.com", "username");

        when(userService.getUser(any())).thenReturn(Optional.of(user));

        mockMvc.perform(get("/user")
                .param("email", "test@example.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.username").value(user.getUsername()));
    }

    @Test
    void testGetUser_badRequest() throws Exception {
        mockMvc.perform(get("/user")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetUser_notFound() throws Exception {
        when(userService.getUser(any())).thenReturn(Optional.empty());

        mockMvc.perform(get("/user")
                .param("email", "test@example.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateUser_badRequest() throws Exception {
        String invalidJson = """
                {
                  "username": "newName"
                }
                """; // missing "id"

        mockMvc.perform(patch("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testUpdateUser_notFound() throws Exception {
        String validJson = """
                {
                  "id": 1,
                  "username": "newName"
                }
                """;

        when(userService.updateUsername(any(UpdateUserForm.class)))
                .thenReturn(Optional.empty());

        mockMvc.perform(patch("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(validJson))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateUser_success() throws Exception {
        String validJson = """
                {
                  "id": 1,
                  "username": "newName"
                }
                """;

        User user = new User(1, "test@example.com", "newName");

        when(userService.updateUsername(any(UpdateUserForm.class)))
                .thenReturn(Optional.of(user));

        mockMvc.perform(patch("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(validJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.username").value(user.getUsername()));
    }

}
