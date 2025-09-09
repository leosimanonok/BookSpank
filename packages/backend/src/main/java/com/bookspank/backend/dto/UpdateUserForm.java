package com.bookspank.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

// required for json parsing
@Data
@NoArgsConstructor
public class UpdateUserForm {
    @NotNull
    private Integer id;

    @NotNull
    private String username;
}
