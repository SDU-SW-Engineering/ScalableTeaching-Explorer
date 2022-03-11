import * as vscode from 'vscode';
import { Project } from '../api/project';
import { FileExplorer } from '../trees/grading/fileExplorer';

export default function(projectId : number)
{
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Opening project..."
    }, async(resolve) => {
        let projectView = vscode.window.createTreeView('scalable.project.view',{
            treeDataProvider: new FileExplorer
        });
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', projectId);
    });
    
}