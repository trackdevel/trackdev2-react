import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  acronym: z.string(),
})

export type SubjectListItem = z.infer<typeof subjectSchema>
