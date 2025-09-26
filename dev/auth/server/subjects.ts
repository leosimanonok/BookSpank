import { number, object } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

/**
 * This should just be a copy of whats in packages/auth/subjects.ts
 */
export const subjects = createSubjects({
    user: object({
        id: number(),
        username: string(),
    }),
})