import {z} from "zod"

export const taskCommentSchema = z.any()

export type TaskCommentListItem = z.infer<typeof taskCommentSchema>
