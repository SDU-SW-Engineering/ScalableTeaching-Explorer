import axios, { AxiosError } from 'axios';
import * as vscode from 'vscode';
import SubmissionGrade from '../api/submissionGrade';
import State from '../state';
import { GradeType } from '../trees/gradeType';
import { AdditiveSchemeCategory } from '../trees/grading/additiveSchemeCategory';


export default async function () {
    let submit = await vscode.window.showInformationMessage("Are you sure you want to submit your gradings?", {
        modal: true
    }, "Yes", "No");

    if (submit !== "Yes")
        return;

    let project = State.getOpenedProject();

    if (project === null)
        return;
    
    let tree = State.getGuidelines();

    if (tree === null)
        return;

    let children : vscode.TreeItem[] | null | undefined = await tree.getChildren();

    if (children === null || children === undefined || children.length === 0)
        return;

    let allTasks : SubmissionGrade[] = [];
    children.forEach(x => {
        if (x instanceof AdditiveSchemeCategory === false)
            return;
        
        let guideline = x as AdditiveSchemeCategory;
    
        let tasks = guideline.subtask.guides.filter(x => x.points != null).map(subtask => <SubmissionGrade> {
            subtaskId: subtask.id,
            points: subtask.getPoints() == subtask.maxPoints ? subtask.maxPoints : subtask.getPoints(),
            comment: subtask.comment == null ? null : subtask.comment.text
        });
        allTasks.push(...tasks);
    });

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Submitting grade..."
    }, async() => {
        try
        {
            await axios.post(`courses/${State.getCourse()?.id}/tasks/${project?.task_id}/projects/${project?.id}/submit-grading`, {
                tasks: allTasks,
                startedAt: State.getStartTime(),
                endedAt: new Date().toISOString()
            });
            vscode.window.showInformationMessage(`${project?.repo_name} successfully graded!`);
            State.refreshCourse();
            State.closeProject();
        }
        catch(error)
        {
            const axiosError = error as AxiosError;
            if (axiosError.response === undefined)
                return;
            
            vscode.window.showErrorMessage(axiosError.response.data, {
                modal: true
            });
            return;
            
        }
    });
}