package com.bookspank.backend.service;

import com.bookspank.backend.model.User;

public interface UserService {
    public User getUser(String email);
}
