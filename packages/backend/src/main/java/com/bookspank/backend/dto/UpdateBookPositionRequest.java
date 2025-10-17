package com.bookspank.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateBookPositionRequest {

    @NotNull
    @Min(0)
    private Integer bookId;

    @NotNull
    @Min(0)
    private Integer origPosition;

    @NotNull
    @Min(0)
    private Integer newPosition;

}
