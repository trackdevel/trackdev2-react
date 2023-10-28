import { z } from "zod"

export const taskSchema = z.any()

export type TaskListItem = z.infer<typeof taskSchema>
