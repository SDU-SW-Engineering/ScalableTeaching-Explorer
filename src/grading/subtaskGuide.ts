import Subtask from "./subtask";

export default class SubtaskGuide
{

    public constructor(
        public readonly id : number,
        public readonly text : string,
        public readonly points : number,
        public selected : boolean = false,
        private subtask : Subtask)
    {

    }

    public select() : void
    {
        this.subtask.unselectAll();
        this.selected = true;
    }
}