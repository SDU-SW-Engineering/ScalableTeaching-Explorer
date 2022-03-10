import axios from 'axios';
import * as vscode from 'vscode';
import { Course } from '../api/course';
import { CourseBrowser } from '../courseBrowser';

export default async function(id: number): Promise<void> {
    let coursePicker = await vscode.window.showQuickPick<CourseItem>(new Promise(async(resolve, reject) => {
        let response = await axios.get('/vs-code/courses');
        let options = response.data.map(((course : Course) => new CourseItem(course)));
        resolve(options);
    }), {
        "title": "Open Course",
    });
    if (coursePicker === undefined)
        return;
    vscode.commands.executeCommand("setContext", "scalableteaching.openedCourse", coursePicker.course);


    //let document = await vscode.workspace.openTextDocument(vscode.Uri.parse("scalable:test.java"));
    //await vscode.window.showTextDocument(document);


    //	vscode.window.showInformationMessage("hey " + id);

    new CourseBrowser().show();
}

class CourseItem implements vscode.QuickPickItem {

    kind?: vscode.QuickPickItemKind | undefined;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    buttons?: readonly vscode.QuickInputButton[] | undefined;
    label: string;

    constructor(public course: Course)
    {
        this.label = course.name;
        this.detail = `${course.members_count} members`;
    }

}