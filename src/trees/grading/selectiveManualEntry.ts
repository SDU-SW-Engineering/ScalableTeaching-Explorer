import * as vscode from 'vscode';
import Subtask from '../../grading/subtask';

export class ManualEntry extends vscode.TreeItem
{
    public constructor(public subTask : Subtask)
    {
        super("Manual Entry...", vscode.TreeItemCollapsibleState.None);

        let isManual = subTask.isManual();
        this.resourceUri = isManual ? vscode.Uri.parse("/selectedGrade") : undefined;
        let test : vscode.ThemeIcon = new vscode.ThemeIcon("check");
        this.iconPath = isManual ? test : undefined;
        this.description = isManual ?  subTask.manual?.points.toString() ?? "" : undefined;
    }
}