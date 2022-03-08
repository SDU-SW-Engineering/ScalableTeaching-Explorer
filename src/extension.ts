import * as vscode from 'vscode';
import { Courses } from './courses';
import { GradingTree } from './trees/grading/gradingTree';
import { DocumentProvider } from './documentProvider';
import openCourse from './commands/openCourse';
import signIn from './commands/signIn';
import { DocumentViewer } from './documentViewer';


export function activate(context: vscode.ExtensionContext) {
	vscode.commands.executeCommand('setContext', 'scalableteaching.authenticated', context.globalState.get('authenticated') === true);
	vscode.workspace.registerTextDocumentContentProvider("scalable", new DocumentProvider);
	const documentViewer = new DocumentViewer();
	documentViewer.start();
	
	
	/*let view = vscode.window.createTreeView('scalable.courses', {
		"treeDataProvider": new Courses
	});
	//view.title = "Updated!";*/

	vscode.commands.registerCommand('scalableteaching.openCourse', openCourse);

	let signInCommand = vscode.commands.registerCommand('scalableteaching.signIn', () => signIn(context));

	context.subscriptions.push(signInCommand);
}



// this method is called when your extension is deactivated
export function deactivate() {
}
