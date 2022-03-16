import * as vscode from 'vscode';
import State from '../state';

export default async function()
{
    let discard = await vscode.window.showInformationMessage("Are you sure you wan't to discard your gradings?", {
        modal: true
    }, "Yes", "No");

    if (discard !== 'Yes')
        return;

    State.closeProject();
}