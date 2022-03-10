import * as vscode from 'vscode';
import { GradingTree } from '../trees/grading/gradingTree';

export default async function(id: number): Promise<void> {
    let test = await vscode.window.showQuickPick(new Promise((resolve, reject) => {
        setTimeout(() => resolve(["Object-orienteret Programmering", "Web Technologies"]), 2000);
    }), {
        "title": "Open Course",
    });
    if (test === undefined)
        return;
    vscode.commands.executeCommand("setContext", "scalableteaching.openedCourse", 11);


    //let document = await vscode.workspace.openTextDocument(vscode.Uri.parse("scalable:test.java"));
    //await vscode.window.showTextDocument(document);

    //	vscode.window.showInformationMessage("hey " + id);
	vscode.window.registerTreeDataProvider("scalable.feedback.list", new GradingTree);
}