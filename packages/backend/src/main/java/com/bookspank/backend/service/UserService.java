package com.bookspank.backend.service;

import java.util.Optional;

import com.bookspank.backend.dto.UpdateUserForm;
import com.bookspank.backend.model.User;

public interface UserService {
    public Optional<User> getUser(String email);

    public Optional<User> updateUsername(UpdateUserForm form);
}
