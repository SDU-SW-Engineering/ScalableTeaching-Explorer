import SubtaskGuide from "../grading/subtaskGuide";
import { AdditiveGuidelineTree } from "../trees/grading/additiveGuidelineTree";
import State from "../state";
import { GradeType } from "../trees/gradeType";
import * as vscode from 'vscode';

export default async function (guide: SubtaskGuide, guidelineTree: AdditiveGuidelineTree) {
    if (guide.hasMaxPoints())
        guide.setPoints(0);
    else if (guide.points === 0 || guide.points === null)
        guide.setPoints(guide.maxPoints);
    else {
        const decision = await vscode.window.showQuickPick(["Full points", "No points"], {
            title: "Overwrite partial grade to"
        }) as "Full points" | "No points" | undefined;

        if (decision == undefined)
            return;

        guide.setPoints(decision === "Full points" ? guide.maxPoints : 0);
    }
    guidelineTree.refresh();

}