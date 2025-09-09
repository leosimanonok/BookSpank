package com.bookspank.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;
import com.bookspank.backend.repository.UserRepository;
import com.bookspank.backend.service.impl.UserServiceImpl;

public class UserServiceTest {

    private UserRepository userRepository;
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class); // mock the dependency
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    void testGetUser_found() {
        User user = new User(1, "test@example.com", "TestUser");

        // define behavior of mock
        when(userRepository.getUser("test@example.com"))
                .thenReturn(Optional.of(user));

        Optional<User> result = userService.getUser("test@example.com");
        assertTrue(result.isPresent());
        assertEquals("TestUser", result.get().getUsername());
    }

    @Test
    void testGetUser_notFound() {
        when(userRepository.getUser("missing@example.com"))
                .thenReturn(Optional.empty());

        Optional<User> result = userService.getUser("missing@example.com");
        assertFalse(result.isPresent());
    }

    @Test
    void testUpdateUser_found() {
        UpdateUserForm form = new UpdateUserForm();
        form.setId(1);
        form.setUsername("TestUser");

        User user = new User(1, "test@example.com", "TestUser");

        when(userRepository.updateUser(form))
                .thenReturn(Optional.of(user));

        Optional<User> result = userService.updateUsername(form);
        assertTrue(result.isPresent());
        assertEquals("TestUser", result.get().getUsername());
    }

    @Test
    void testUpdateUser_notFound() {
        UpdateUserForm form = new UpdateUserForm();
        form.setId(1);
        form.setUsername("TestUser");

        when(userRepository.updateUser(form))
                .thenReturn(Optional.empty());

        Optional<User> result = userService.updateUsername(form);
        assertFalse(result.isPresent());
    }
}
