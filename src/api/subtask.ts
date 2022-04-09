import { Comment } from "../trees/commentItem";

export interface Subtask
{
    id: number,
    points: number,
    name: string,
    alias: string|null,
    pointsAcquired: null|number,
    comments: Comment[]
}