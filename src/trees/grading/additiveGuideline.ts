import { match } from 'assert';
import * as vscode from 'vscode';
import SubtaskGuide from '../../grading/subtaskGuide';
import { GradeType } from '../gradeType';
import { AdditiveGuidelineTree } from './additiveGuidelineTree';

export class AdditiveGuideline extends vscode.TreeItem
{
    public constructor(public guide : SubtaskGuide, public treeProvider : AdditiveGuidelineTree)
    {
        super(guide.text, guide.comment == null ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Expanded);
        this.description = `${guide.getPoints()}/${guide.maxPoints}  pts`;
        this.contextValue = guide.comment == null ? "scalableTeaching.additiveGradingItem" : "scalableTeaching.additiveGradingItemWithComment";

        switch(guide.gradeType())
        {
            case GradeType.Full:
                this.resourceUri = vscode.Uri.parse("/selectedGrade");
                break;
            case GradeType.Partial:
                this.resourceUri =  vscode.Uri.parse("/partialSelectedGrade")
                break;
            case GradeType.None:
                this.resourceUri = vscode.Uri.parse("/notSelectedGrade")
                break;
        }

        let icon = guide.gradeType() == GradeType.None ? new vscode.ThemeIcon("close") : new vscode.ThemeIcon("check");
        this.iconPath = icon;

        this.command = {
            command: "scalableteaching.toggleGrade",
            title: "Toggle Grade",
            arguments: [this.guide, this.treeProvider],
        };
    }
}