import * as vscode from 'vscode';
import { Course } from '../../api/course';
import { Project } from '../../api/project';
import { Task } from '../../api/task';


export class GradingTree implements vscode.TreeDataProvider<TaskItem | ProjectItem> {


    public constructor(private course : Course, private tasks : Task[])
    {
    }

    getTreeItem(element: TaskItem): vscode.TreeItem | Thenable<vscode.TreeItem> {

        
        return element;
    }
    getChildren(element?: TaskItem | ProjectItem): vscode.ProviderResult<TaskItem[] | ProjectItem[]> {
       if (element === undefined)
            return this.tasks.map(t => new TaskItem(t));
        if (element instanceof ProjectItem)
            return [];
            
        let projects = element.task.projects as Project[];
        return projects.map(p => new ProjectItem(p));
    }
}

class TaskItem extends vscode.TreeItem {
    constructor(public task : Task) {
        super(task.name, vscode.TreeItemCollapsibleState.Collapsed);
        this.tooltip = "LOL";
        this.description = "waddup";
    }
}

class ProjectItem extends vscode.TreeItem {

    constructor(public project : Project)
    {
        super({
            label: project.repo_name,
        }, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = vscode.Uri.parse("/aUserHere");

    }
    /*this.command = {
            "command": "scalableteaching.openCourse",
            "title": "Videregående Objecktor",
            "arguments": [1]
        };*/
}