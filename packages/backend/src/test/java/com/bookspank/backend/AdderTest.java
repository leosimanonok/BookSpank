package com.bookspank.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AdderTest {

    @Test
    void addTwoNumbers() {
        Adder adder = new Adder();
        int result = adder.add(2, 3);
        assertEquals(5, result, "2 + 3 = 5");
    }

}
