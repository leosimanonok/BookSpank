// package com.bookspank.backend.model;

// import static org.junit.jupiter.api.Assertions.assertThrows;

// import java.time.LocalDate;

// import org.junit.jupiter.api.Test;

// public class BookTest {

// @Test
// void testInvalidDates() {
// LocalDate started = LocalDate.of(2025, 9, 10);
// LocalDate finished = LocalDate.of(2025, 9, 9);

// assertThrows(IllegalArgumentException.class, () -> {
// new Book(1, "Title", "Author", 100, 1, started, finished);
// });
// }

// @Test
// void testValidDates() {
// LocalDate started = LocalDate.of(2025, 9, 9);
// LocalDate finished = LocalDate.of(2025, 9, 10);

// new Book(1, "Title", "Author", 100, 1, started, finished);
// }
// }
