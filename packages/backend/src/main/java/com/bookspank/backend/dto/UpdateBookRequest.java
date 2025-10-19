package com.bookspank.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateBookRequest {

    @NotNull
    @Min(0)
    private Integer bookId;

    @NotNull
    private Boolean wantToReadNext;

}
