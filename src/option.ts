import * as vscode from 'vscode';
export class Option extends vscode.TreeItem {
    constructor(
        public readonly label: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = {
            "command": "scalableteaching.openCourse",
            "title": "Videregående Objecktor",
            "arguments": [1]
        };
    }
}