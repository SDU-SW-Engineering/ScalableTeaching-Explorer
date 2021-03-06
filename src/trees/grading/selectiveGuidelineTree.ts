import * as vscode from 'vscode';
import GradingScheme from '../../grading/gradingScheme';
import { ManualEntry } from './ManualEntry';
import { SelectiveGuideline } from './selectiveGuideline';
import { SelectiveSchemeCategory } from './selectiveSchemeCategory';

export class SelectiveGuidelineTree implements vscode.TreeDataProvider<vscode.TreeItem> {

    public constructor(public schema : GradingScheme)
    {

    }

    private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = new vscode.EventEmitter<undefined | null | void>();
    onDidChangeTreeData?: vscode.Event<void | vscode.TreeItem | null | undefined> | undefined = this._onDidChangeTreeData.event;

    public refresh()
    {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        if (element === undefined)
            return this.schema.subtasks.map(s => new SelectiveSchemeCategory(s));
        if (element instanceof SelectiveSchemeCategory)
            return [...element.subtask.guides.map(guide => new SelectiveGuideline(guide)), new ManualEntry(element.subtask)];
        
        return [];
    }
}