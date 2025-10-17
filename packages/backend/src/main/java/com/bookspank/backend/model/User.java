package com.bookspank.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    public User(Integer id, String username) {
        this.id = id;
        this.username = username;
    }

    private Integer id;
    private String email;
    private String username;

    public boolean isSetUp() {
        return this.username != null;
    }
}
