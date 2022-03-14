import { Course } from './api/course';
import { TaskTree } from './trees/taskTree';
import * as vscode from 'vscode';
import axios from 'axios';
import { Task } from './api/task';

export class CourseBrowser {
    public async show(course: Course) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            cancellable: false,
            title: "Loading tasks..."
        }, async () => {
            let response = await axios.get<Task[]>(`courses/${course.id}/tasks`);
            let view = vscode.window.createTreeView("scalable.feedback.list", {
                treeDataProvider: new TaskTree(course, response.data)
            });
            view.title = course.name;
        });
    }
}