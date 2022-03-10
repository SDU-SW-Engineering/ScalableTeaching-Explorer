import * as vscode from 'vscode';
import { Courses } from './courses';
import { GradingTree } from './trees/grading/gradingTree';
import { DocumentProvider } from './documentProvider';
import openCourse from './commands/openCourse';
import signIn from './commands/signIn';
import { DocumentViewer } from './documentViewer';
import { ScalableTeachingAuthenticationProvider } from './authProvider';
import signOut from './commands/signOut';


export async function activate(context: vscode.ExtensionContext) {

	let authenticationProvider = new ScalableTeachingAuthenticationProvider(context.secrets);
 	vscode.authentication.registerAuthenticationProvider(
		ScalableTeachingAuthenticationProvider.id,
		'ScalableTeaching',
		authenticationProvider
	);

	//vscode.commands.executeCommand('setContext', 'scalableteaching.authenticated', context.globalState.get('authenticated') === true);
	vscode.workspace.registerTextDocumentContentProvider("scalable", new DocumentProvider);
	const documentViewer = new DocumentViewer();
	documentViewer.start();
	


	/*let view = vscode.window.createTreeView('scalable.courses', {
		"treeDataProvider": new Courses
	});
	//view.title = "Updated!";*/

	vscode.commands.registerCommand('scalableteaching.openCourse', openCourse);

	let signInCommand = vscode.commands.registerCommand('scalableteaching.signIn', () => signIn(context));
	let signOutCommands = vscode.commands.registerCommand('scalableteaching.signOut', () => signOut(authenticationProvider));

	context.subscriptions.push(signInCommand);
}



// this method is called when your extension is deactivated
export function deactivate() {
}
