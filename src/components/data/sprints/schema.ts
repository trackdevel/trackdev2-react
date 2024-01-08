import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const sprintSchema = z.any();

export type SprintListItem = z.infer<typeof sprintSchema>
