import * as vscode from 'vscode';
import { Option } from './option';


export class Courses implements vscode.TreeDataProvider<Option> {
    getTreeItem(element: Option): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: Option): vscode.ProviderResult<Option[]> {
        return [
            new Option("Videregående Objekt-orienteret Programmering")
        ];
    }
}