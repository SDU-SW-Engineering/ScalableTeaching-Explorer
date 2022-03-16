import Subtask from "./subtask";

export default class SubtaskGuide
{
    public selected : boolean = false;

    public constructor(public readonly id : number, public readonly text : string, public readonly points : number,  private subtask : Subtask)
    {

    }

    public select() : void
    {
        this.subtask.unselectAll();
        this.selected = true;
    }
}