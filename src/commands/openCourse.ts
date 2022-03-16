import axios from 'axios';
import * as vscode from 'vscode';
import { Course } from '../api/course';
import State from '../state';

export default async function(): Promise<void> {
    let coursePicker = await vscode.window.showQuickPick<CourseItem>(new Promise(async(resolve) => {
        let response = await axios.get('courses');
        let options = response.data.map(((course : Course) => new CourseItem(course)));
        resolve(options);
    }), {
        "title": "Open Course",
    });
    if (coursePicker === undefined)
        return;

    State.openCourse(coursePicker.course);
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