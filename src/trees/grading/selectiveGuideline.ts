import * as vscode from 'vscode';
import Subtask from '../../grading/subtask';
import SubtaskGuide from '../../grading/subtaskGuide';

export class SelectiveGuideline extends vscode.TreeItem
{
    public constructor(public guide : SubtaskGuide)
    {
        super(guide.text, vscode.TreeItemCollapsibleState.None);
        //this.description = guide.points + " pts";

        //this.resourceUri = guide.selected ? vscode.Uri.parse("/selectedGrade") : undefined;
        let test : vscode.ThemeIcon = new vscode.ThemeIcon("check");
        //this.iconPath = guide.selected ? test : undefined;
    }
}