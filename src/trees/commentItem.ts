import * as vscode from 'vscode';
import SubtaskGuide from '../grading/subtaskGuide';

export class Comment extends vscode.TreeItem
{
    public constructor(public comment : string, public parent : SubtaskGuide)
    {
        super(comment, vscode.TreeItemCollapsibleState.None);
        this.iconPath = new vscode.ThemeIcon("comment");
        this.contextValue = "scalableTeaching.commentItem";
    }
}