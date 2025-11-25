package com.bookspank.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompleteBookRequest {

    @NotNull
    private Integer bookId;
}
