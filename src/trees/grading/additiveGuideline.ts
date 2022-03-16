import * as vscode from 'vscode';
import SubtaskGuide from '../../grading/subtaskGuide';
import { AdditiveGuidelineTree } from './additiveGuidelineTree';

export class AdditiveGuideline extends vscode.TreeItem
{
    public constructor(public guide : SubtaskGuide, private treeProvider : AdditiveGuidelineTree)
    {
        super(guide.text, vscode.TreeItemCollapsibleState.None);
        this.description = guide.points + " pts";

        this.resourceUri = guide.selected ? vscode.Uri.parse("/selectedGrade") : vscode.Uri.parse("/notSelectedGrade");
        let icon = guide.selected ? new vscode.ThemeIcon("check") : new vscode.ThemeIcon("close");
        this.iconPath = icon;

        this.command = {
            command: "scalableteaching.toggleGrade",
            title: "Toggle Grade",
            arguments: [this.guide, this.treeProvider],
        };
    }
}