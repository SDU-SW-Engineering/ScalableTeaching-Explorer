import { GradeType } from "../trees/gradeType";
import { Grade } from "./grade";
import SubtaskGuide from "./subtaskGuide";

export default class Subtask {

    public manual: Grade | null = null;

    public constructor(
        public readonly text: string,
        public guides: SubtaskGuide[] = []
    ) {

    }

    public addGuide(id : number, text: string, maxPoints: number, pointsGiven : number) {
        this.guides.push(new SubtaskGuide(id, text, maxPoints, pointsGiven,  this));
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
        this.guides.forEach(s => s.setPoints(0));
    }

    public isManual(): boolean {
        return this.manual !== null;
    }

    public selectedGrade(): Grade | null {
        if (this.manual !== null)
            return this.manual;

        let selected = this.guides.find(x => x.gradeType() === GradeType.Full || x.gradeType() === GradeType.Partial);
        if (selected !== undefined) {
            return {
                points: selected.maxPoints,
                message: selected.text
            };
        }

        return null;
    }

    public selectedGrades(): Grade[] {
        return this.guides.filter(x => x.gradeType() === GradeType.Full || x.gradeType() === GradeType.Partial).map(x => {
            return <Grade> {
                points: x.getPoints(),
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