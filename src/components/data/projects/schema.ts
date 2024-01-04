import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const projectSchema = z.any()

export type ProjectListItem = z.infer<typeof projectSchema>
