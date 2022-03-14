import * as vscode from 'vscode';
import Subtask from '../../grading/subtask';

export class AdditiveSchemeCategory extends vscode.TreeItem
{
    public constructor(public subtask : Subtask)
    {
        super(subtask.text, vscode.TreeItemCollapsibleState.Expanded);
        let selectedGrade = subtask.selectedGrade();
        this.description = `${selectedGrade === null ? 0 : selectedGrade.points}/${subtask.maxPoints} points`;
    }
}

