import { Course } from './api/course';
import { GradingTree } from './trees/grading/gradingTree';
import * as vscode from 'vscode';

export class CourseBrowser
{
    public show()
    {
        console.log(vscode.commands.executeCommand("getContext"), "scalableteaching.openedCourse");
	    vscode.window.registerTreeDataProvider("scalable.feedback.list", new GradingTree);
    }
}