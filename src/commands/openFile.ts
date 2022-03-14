import axios from 'axios';
import * as vscode from 'vscode';
import { File } from '../api/file';
import { Project } from "../api/project";

export default async function(file : File, project : Project, courseId : number)
{   
    const uri = vscode.Uri.parse('scalable:' + file.full + "?url=courses/3/tasks/9/projects/879/file&file=" + file.full);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
}