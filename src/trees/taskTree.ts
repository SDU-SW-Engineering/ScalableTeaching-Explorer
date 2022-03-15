import * as vscode from 'vscode';
import { Course } from '../api/course';
import { Project } from '../api/project';
import { Task } from '../api/task';


export class TaskTree implements vscode.TreeDataProvider<TaskItem | ProjectItem> {


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
            
        return element.task.projects.map(p => new ProjectItem(p, this.course));
    }
}

class TaskItem extends vscode.TreeItem {
    constructor(public task : Task) {
        super(task.name, vscode.TreeItemCollapsibleState.Expanded);
        this.description = task.projects.length + " tasks";
    }
}

class ProjectItem extends vscode.TreeItem {

    constructor(public project : Project, public course : Course)
    {
        super({
            label: project.repo_name,
        }, vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: "scalableteaching.openProject",
            title: "Open Project",
            arguments: [project, course.id],
        };
        let test : vscode.ThemeIcon = new vscode.ThemeIcon("account");
        this.iconPath = test;
    }
}