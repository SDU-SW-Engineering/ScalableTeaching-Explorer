import axios from 'axios';
import * as vscode from 'vscode';
import { Directory } from '../api/directory';
import { Project } from '../api/project';
import { FileExplorer } from '../trees/grading/fileExplorer';

export default function(project : Project, courseId : number)
{
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Opening project..."
    }, async(resolve) => {
        
        let response = await axios.get<Directory>("courses/3/tasks/9/projects/879/tree");//`/courses/${courseId}/tasks/${project.task_id}/projects/${project}/tree`);
        

        let projectView = vscode.window.createTreeView('scalable.project.view',{
            treeDataProvider: new FileExplorer(project, response.data, courseId)
        });
        projectView.title = `Project: ${project.repo_name}`;
    
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', project.id);
    });
    
}