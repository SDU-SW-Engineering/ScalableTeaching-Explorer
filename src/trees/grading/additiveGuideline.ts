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
        this.description = guide.getPoints() == null ? "Ungraded" : `${guide.getPoints()}/${guide.maxPoints}  pts`;
        this.contextValue = guide.comment == null ? "scalableTeaching.additiveGradingItem" : "scalableTeaching.additiveGradingItemWithComment";

        switch(guide.gradeType())
        {
            case GradeType.Full:
                this.resourceUri = vscode.Uri.parse("/selectedGrade");
                this.iconPath = new vscode.ThemeIcon("check");
                break;
            case GradeType.Partial:
                this.resourceUri =  vscode.Uri.parse("/partialSelectedGrade")
                this.iconPath = new vscode.ThemeIcon("check");
                break;
            case GradeType.None:
                this.resourceUri = vscode.Uri.parse("/notSelectedGrade")
                this.iconPath = new vscode.ThemeIcon("close");
                break;
            case GradeType.Ungraded:
                this.iconPath = new vscode.ThemeIcon("warning");
                this.resourceUri = undefined;
        }

        this.command = {
            command: "scalableteaching.toggleGrade",
            title: "Toggle Grade",
            arguments: [this.guide, this.treeProvider],
        };
    }
}