import { z } from "zod"
import {subjectSchema} from "../subjects/schema";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const courseSchema = z.object({
    id: z.number(),
    startYear: z.number(),
    subject: subjectSchema,
})

export type CourseListItem = z.infer<typeof courseSchema>
