import * as vscode from 'vscode';
import { Courses } from './courses';
import { GradingTree } from './trees/grading/gradingTree';
import { DocumentProvider } from './documentProvider';
import openCourse from './commands/openCourse';
import signIn from './commands/signIn';
import { DocumentViewer } from './documentViewer';
import { ScalableTeachingAuthenticationProvider } from './authProvider';
import signOut from './commands/signOut';
import axios from 'axios';

export async function activate(context: vscode.ExtensionContext) {

	let authenticationProvider = new ScalableTeachingAuthenticationProvider(context.secrets);
	vscode.authentication.registerAuthenticationProvider(
		ScalableTeachingAuthenticationProvider.id,
		'ScalableTeaching',
		authenticationProvider
	);

	vscode.commands.executeCommand('setContext', 'scalableteaching.authenticated', await authenticationProvider.isAuthenticated());
	vscode.workspace.registerTextDocumentContentProvider("scalable", new DocumentProvider);
	const documentViewer = new DocumentViewer();
	

	axios.interceptors.request.use(async (request) => {
		const serverName = serverConfiguration();
		if (serverName === null)
		{
			vscode.window.showErrorMessage("Server not setup. Please verify that the address in settings, is correct for your ScalableTeaching instace.");
			throw new axios.Cancel("Server not configured");
		}
		request.baseURL = serverName.origin + "/api";
		
		let session = await vscode.authentication.getSession(ScalableTeachingAuthenticationProvider.id, []);
		if (session)
		{
			request.headers= {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"Accept": "application/json",
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"Authorization": "Bearer " + session.accessToken
			};
		}
		
		return request;
		
	});


		


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


function serverConfiguration(): null | URL {
	let server = vscode.workspace.getConfiguration().get<string>('server');
	if (server === undefined)
		return null;

	try {
		return new URL(server);
		
	}
	catch (e) {
		return null;
	}
}





// this method is called when your extension is deactivated
export function deactivate() {
}
