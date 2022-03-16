import * as vscode from 'vscode';
import { Project } from './api/project';
import { AdditiveGuidelineTree } from './trees/grading/additiveGuidelineTree';

export default class State
{
    private static openedProject : null | Project = null;
    private static grading : null | AdditiveGuidelineTree = null;

    public static openProject(project : Project, courseId : number, grading : AdditiveGuidelineTree)
    {
        this.openedProject = project;
        this.grading = grading;
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', project.id);
    }

    public static closeProject()
    {
        this.openedProject = null;
        this.grading = null;
        vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', null);
    }

    public static getOpenedProject() : null | Project
    {
        return this.openedProject;
    }

    public static setGuidelines(grading : AdditiveGuidelineTree)
    {
        this.grading = grading;
    }

    public static getGuidelines() : null | AdditiveGuidelineTree
    {
        return this.grading;
    }
}