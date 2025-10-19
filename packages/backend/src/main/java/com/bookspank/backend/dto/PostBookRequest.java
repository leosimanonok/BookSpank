package com.bookspank.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

// required for json parsing
@Data
@NoArgsConstructor
public class PostBookRequest {
    @NotNull
    private String title;

    @NotNull
    private String author;

    private Integer coverId;
}
