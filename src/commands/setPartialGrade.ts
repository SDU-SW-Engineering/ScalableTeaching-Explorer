import * as vscode from 'vscode';
import { Comment } from '../trees/commentItem';
import { GradeType } from '../trees/gradeType';
import { AdditiveGuideline } from '../trees/grading/additiveGuideline';

export default async function (guideline: AdditiveGuideline) {
    const pointInput = await vscode.window.showInputBox({
        title: guideline.guide.text,
        placeHolder: "Enter points",
        validateInput: text => {
            let number = Number(text);
            if (isNaN(number))
                return "Not a number";

            const maxPoints = guideline.guide.maxPoints;
            if (number > maxPoints || number < 0)
                return `Value should be between 0 to ${maxPoints}`;
            return null;
        }
    });

    if (pointInput == null)
        return;

    let pointsGiven = Number(pointInput);

    let comment = undefined;

    while (comment === undefined) {
        let willComment = await await vscode.window.showQuickPick(["No", "Yes"], {
            title: "Would you like to comment?"
        }) as "Yes" | "No";

        if (willComment === "No") {
            comment = null;
            break;
        }

        comment = await vscode.window.showInputBox({
            "title": "Enter comment"
        });
    }

    if (comment !== undefined && comment !== null) {
        guideline.guide.comment = new Comment(comment, guideline.guide);
    }

    guideline.guide.setPoints(pointsGiven);
    guideline.treeProvider.refresh();
}