import { Comment } from "../trees/commentItem";
import { GradeType } from "../trees/gradeType";
import Subtask from "./subtask";

export default class SubtaskGuide
{
    public comment : Comment | null = null;

    public constructor(
        public readonly id : number,
        public readonly text : string,
        public readonly maxPoints : number,
        public points : number|null,
        private subtask : Subtask)
    {
    }

    public setPoints(points : number)
    {
        if (points > this.maxPoints)
            throw new Error("Points can't be more than max points.");
        this.points = points;
    }

    public getPoints()
    {
        return this.points;
    }

    public select() : void
    {
        this.subtask.unselectAll();
    }

    public hasMaxPoints() : boolean
    {
        return this.points == this.maxPoints;
    }

    public gradeType() : GradeType
    {
        if (this.points == null)
            return GradeType.Ungraded;
        if (this.points == 0)
            return GradeType.None;
        if (this.hasMaxPoints())
            return GradeType.Full;
        return GradeType.Partial;
    }

    public setComment(comment : string)
    {
        this.comment = new Comment(comment, this);
    }
}