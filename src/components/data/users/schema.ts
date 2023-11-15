import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.any()

export type UserListItem = z.infer<typeof userSchema>
