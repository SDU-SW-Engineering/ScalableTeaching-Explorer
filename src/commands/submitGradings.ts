import * as vscode from 'vscode';
import State from '../state';
import { AdditiveSchemeCategory } from '../trees/grading/additiveSchemeCategory';


export default async function () {
    let submit = await vscode.window.showInformationMessage("Are you sure you want to submit your gradings?", {
        modal: true
    }, "Yes", "No");

    if (submit !== "Yes")
        return;

    let tree = State.getGuidelines();

    if (tree === null)
        return;

    let children : vscode.TreeItem[] | null | undefined = await tree.getChildren();

    if (children === null || children === undefined || children.length === 0)
        return;

    let solvedIds : number[] = [];
    children.forEach(x => {
        if (x instanceof AdditiveSchemeCategory === false)
            return;
        
        let guideline = x as AdditiveSchemeCategory;
    
        let solveGroupIds = guideline.subtask.guides.filter(x => x.selected).map(x => x.id);
        solvedIds.push(...solveGroupIds);
    });


    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Opening project..."
    }, async() => 'Submitting grade...');
}