import axios from 'axios';
import * as vscode from 'vscode';
import { Directory } from '../api/directory';
import { Project } from '../api/project';
import GradingScheme from '../grading/gradingScheme';
import Subtask from '../grading/subtask';
import { Subtask as Guide } from '../api/subtask';
import SubtaskGuide from '../grading/subtaskGuide';
import { FileExplorer } from '../trees/fileExplorer';
import { SelectiveGuidelineTree } from '../trees/grading/selectiveGuidelineTree';
import { ManualEntry } from '../trees/grading/ManualEntry';
import { AdditiveGuidelineTree } from '../trees/grading/additiveGuidelineTree';
import { SelectiveGuideline } from '../trees/grading/selectiveGuideline';
import  { AxiosError } from 'axios';
import { TaskGroup } from '../api/taskGroup';

export default function(project : Project, courseId : number)
{
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Opening project..."
    }, async(resolve) => {
        
        try
        {
            let response = await axios.get(`/courses/${courseId}/tasks/${project.task_id}/projects/${project.id}/tree`);
          

            let projectView = vscode.window.createTreeView('scalable.project.view',{
                treeDataProvider: new FileExplorer(project, response.data, courseId)
            });
            projectView.title = `Project: ${project.repo_name}`;
    
           /* let subtask1 = new Subtask("Syntax", 30);
            subtask1.addGuide("Bad", 0);
            subtask1.addGuide("Okay", 10);
            subtask1.addGuide("Good", 30);
            let subtask2 = new Subtask("Logic", 50);
            subtask2.addGuide("Bad", 0);
            subtask2.addGuide("Okay", 25);
            subtask2.addGuide("Good", 50);
    
            let scheme = new GradingScheme([
                subtask1, subtask2
            ]);*/

            let gradingSchemeResponse = await axios.get<TaskGroup[]>(`/courses/${courseId}/tasks/${project.task_id}/projects/${project.id}/grading-scheme`);
            let scheme = new GradingScheme();
            gradingSchemeResponse.data.forEach(taskGroup => {
                let subtask = new Subtask(taskGroup.group, 50);
                taskGroup.tasks.forEach(guide => subtask.addGuide(guide.name, guide.points));
                scheme.subtasks.push(subtask);
            });

            let gradingTree =  new AdditiveGuidelineTree(scheme);// new AdditiveGuidelineTree(scheme);
    
            let gradingView = vscode.window.createTreeView('scalable.project.grading', {
                treeDataProvider: gradingTree
            });
    
    
            /*gradingView.onDidChangeSelection(async e => {
                let selected = e.selection[0];
    
                if (selected instanceof SelectiveGuideline)
                    selected.guide.select();
                if (selected instanceof ManualEntry)
                {
                    let pointsGiven = await vscode.window.showInputBox({
                        prompt: `Enter points given (between 0-${selected.subTask.maxPoints})`
                    });
                    if (pointsGiven === undefined)
                        return false;
                    let intPointsGiven = parseInt(pointsGiven);
                    if (isNaN(intPointsGiven) || intPointsGiven < 0 || intPointsGiven > selected.subTask.maxPoints){
                        vscode.window.showErrorMessage("Please enter a valid number.");
                        return false;
                    }
    
                    let message = await vscode.window.showInputBox({
                        prompt: `Enter reasoning (Optional)`
                    });
    
                    selected.subTask.setManualGrade(intPointsGiven, message);
                }
                
                gradingTree.refresh();
            });*/
        
            vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', project.id);
        }
        catch (error)
        {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404)
            {
                vscode.window.showInformationMessage(axiosError.response.data, {
                    modal: true
                });
                return;
            }  
        }
        
    });
    
}