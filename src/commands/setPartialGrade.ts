import * as vscode from 'vscode';
import { Comment } from '../trees/commentItem';
import { AdditiveGuideline } from '../trees/grading/additiveGuideline';

export default async function (guideline: AdditiveGuideline) {
    const pointInput = await vscode.window.showInputBox({
        title: guideline.guide.text,
        placeHolder: "max " + guideline.guide.maxPoints + " points",
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

    guideline.guide.setPoints(pointsGiven);
    guideline.treeProvider.refresh();
}