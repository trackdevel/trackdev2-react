import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const courseSchema = z.object({
  id: z.string(),
  subject: z.string(),
  start_year: z.string(),
})

export type CourseListItem = z.infer<typeof courseSchema>
