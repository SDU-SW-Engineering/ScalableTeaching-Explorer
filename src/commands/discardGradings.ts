import * as vscode from 'vscode';

export default function()
{
    vscode.window.showInformationMessage("Are you sure you wan't to discard your gradings?", {
        modal: true
    }, "Yes", "No");
}