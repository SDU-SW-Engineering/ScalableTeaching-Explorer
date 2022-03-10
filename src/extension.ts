import * as vscode from 'vscode';
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


	vscode.window.registerFileDecorationProvider(new FD);

	vscode.workspace.registerTextDocumentContentProvider("scalable", new DocumentProvider);
	const documentViewer = new DocumentViewer();


	axios.interceptors.request.use(async (request) => {
		const serverName = serverConfiguration();
		if (serverName === null) {
			vscode.window.showErrorMessage("Server not setup. Please verify that the address in settings, is correct for your ScalableTeaching instace.");
			throw new axios.Cancel("Server not configured");
		}
		request.baseURL = serverName.origin + "/api/vs-code";

		let session = await authenticationProvider.isAuthenticated();
		if (!session)
			return request;

		request.headers = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"Accept": "application/json",
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"Authorization": "Bearer " + (await authenticationProvider.getSessions())[0].accessToken
		};


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


class FD implements vscode.FileDecorationProvider {
	onDidChangeFileDecorations?: vscode.Event<vscode.Uri | vscode.Uri[] | undefined> | undefined;
	provideFileDecoration(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FileDecoration> {
		const showCountFor = "/aUserHere";
		if (uri.path === showCountFor) {
			return {
				color: new vscode.ThemeColor("gitDecoration.addedResourceForeground"),
				tooltip: "User count"
			};
		}
	}

}