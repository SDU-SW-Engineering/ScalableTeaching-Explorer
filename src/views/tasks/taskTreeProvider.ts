import * as vscode from 'vscode';
import { Task } from './task';

export class TaskTreeProvider implements vscode.TreeDataProvider<Task> {

    getTreeItem(element: Task): vscode.TreeItem | Thenable<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

    
    getChildren(element?: Task): vscode.ProviderResult<Task[]> {
        throw new Error('Method not implemented.');
    }

}