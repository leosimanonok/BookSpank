package com.bookspank.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

// required for json parsing
@Data
@NoArgsConstructor
public class UpdateUserForm {
    private Integer id;
    private String username;
}
