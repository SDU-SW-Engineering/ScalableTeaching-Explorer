import axios from 'axios';
import * as vscode from 'vscode';
import { Course } from './api/course';
import { Project } from './api/project';
import { Task } from './api/task';
import { AdditiveGuidelineTree } from './trees/grading/additiveGuidelineTree';
import { TaskTree } from './trees/taskTree';

export default class State {
    private static openedProject: null | Project = null;
    private static grading: null | AdditiveGuidelineTree = null;
    
    private static course: null | Course = null;
    private static startTime: string | null = null;

    public static openProject(project: Project, grading: AdditiveGuidelineTree) {
        this.openedProject = project;
        this.grading = grading;
        this.startTime = new Date().toISOString();
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', project.id);
    }

    public static async openCourse(course: Course, withProgress : boolean = true) {
        let promise = async () => {
            let response = await axios.get<Task[]>(`courses/${course.id}/tasks`);
            let view = vscode.window.createTreeView("scalable.feedback.list", {
                treeDataProvider: new TaskTree(course, response.data)
            });
            this.course = course;
            view.title = course.name;
        };

        if (withProgress)
        {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                cancellable: false,
                title: "Loading tasks..."
            }, promise);
            return;
        }
        await promise();
    }

    public static refreshCourse()
    {
        if (this.course === null)
            return;
        this.openCourse(this.course);
    }

    public static closeProject() {
        this.openedProject = null;
        this.grading = null;
        this.startTime = null;
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', null);
    }

    public static closeCourse() {
        this.closeProject();
        this.course = null;
    }

    public static getOpenedProject(): null | Project {
        return this.openedProject;
    }

    public static setGuidelines(grading: AdditiveGuidelineTree) {
        this.grading = grading;
    }

    public static getGuidelines(): null | AdditiveGuidelineTree {
        return this.grading;
    }

    public static getCourse(): null | Course {
        return this.course;
    }

    public static getStartTime(): null | String {
        return this.startTime;
    }
}