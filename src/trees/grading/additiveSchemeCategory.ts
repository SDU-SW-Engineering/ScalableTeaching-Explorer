import * as vscode from 'vscode';
import Subtask from '../../grading/subtask';

export class AdditiveSchemeCategory extends vscode.TreeItem
{
    public constructor(public subtask : Subtask)
    {
        super(subtask.text, vscode.TreeItemCollapsibleState.Expanded);
        let currentPoints = subtask.currentPoints();
        let maxPoints = subtask.guides.map<number>(x => x.points).reduce((a,b) => a+b);
        this.description = `${currentPoints}/${maxPoints} points`;
    }
}

