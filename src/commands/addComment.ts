import * as vscode from 'vscode';
import State from '../state';
import { Comment } from '../trees/commentItem';
import { AdditiveGuideline } from "../trees/grading/additiveGuideline";

export default async function (additiveGuideline: AdditiveGuideline) {

    let comment = await vscode.window.showInputBox({
        "title": "Enter comment"
    });

    if (comment == undefined)
        return;

    additiveGuideline.guide.comment = new Comment(comment, additiveGuideline.guide);
    State.getGuidelines()?.refresh();
}