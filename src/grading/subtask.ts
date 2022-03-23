import { Grade } from "./grade";
import SubtaskGuide from "./subtaskGuide";

export default class Subtask {

    public manual: Grade | null = null;

    public constructor(
        public readonly text: string,
        public readonly maxPoints: number,
        public guides: SubtaskGuide[] = []
    ) {

    }

    public addGuide(id : number, text: string, points: number, selected : boolean = false) {
        this.guides.push(new SubtaskGuide(id, text, points, selected,  this));
    }

    public setManualGrade(points: number, message: string | null = null) {
        this.unselectAll();
        if (message?.trim() === "")
            message = null;
        this.manual = {
            points,
            message
        };
    }

    public unselectAll() {
        this.manual = null;
        this.guides.forEach(s => s.selected = false);
    }

    public isManual(): boolean {
        return this.manual !== null;
    }

    public selectedGrade(): Grade | null {
        if (this.manual !== null)
            return this.manual;

        let selected = this.guides.find(x => x.selected);
        if (selected !== undefined) {
            return {
                points: selected.points,
                message: selected.text
            };
        }

        return null;
    }

    public selectedGrades(): Grade[] {
        return this.guides.filter(x => x.selected).map(x => {
            return <Grade> {
                points: x.points,
                message: x.text
            };
        });
    }

    public currentPoints() : number
    {
        let selectedGrades = this.selectedGrades();

        if(selectedGrades.length === 0)
            return 0;
        return this.selectedGrades().map<number>(x => x.points).reduce((x, y) => x + y);
    }
}