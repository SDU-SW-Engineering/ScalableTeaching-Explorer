import * as vscode from 'vscode';
import { Project } from './api/project';
import { AdditiveGuidelineTree } from './trees/grading/additiveGuidelineTree';

export default class State {
    private static openedProject: null | Project = null;
    private static grading: null | AdditiveGuidelineTree = null;
    private static courseId: null | number = null;

    public static openProject(project: Project, courseId: number, grading: AdditiveGuidelineTree) {
        this.openedProject = project;
        this.grading = grading;
        this.courseId = courseId;
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', project.id);
    }

    public static closeProject() {
        this.openedProject = null;
        this.grading = null;
        this.courseId = null;
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', null);
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

    public static getCourseid(): null | number {
        return this.courseId;
    }
}