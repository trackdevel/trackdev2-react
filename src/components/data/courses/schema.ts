import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const courseSchema = z.object({
//     id: z.number(),
//     startYear: z.number(),
//     subject: subjectSchema,
// })
export const courseSchema = z.any()

export type CourseListItem = z.infer<typeof courseSchema>
