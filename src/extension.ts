import * as vscode from 'vscode';
import { DocumentProvider } from './documentProvider';
import openCourse from './commands/openCourse';
import signIn from './commands/signIn';
import { ScalableTeachingAuthenticationProvider } from './authProvider';
import signOut from './commands/signOut';
import axios from 'axios';
import openProject from './commands/openProject';
import server from './configuration/server';
import openFile from './commands/openFile';
import toggleGrade from './commands/toggleGrade';
import discardGrading from './commands/discardGradings';
import submitGradings from './commands/submitGradings';
import * as https from 'https';
import setPartialGrade from './commands/setPartialGrade';

export async function activate(context: vscode.ExtensionContext) {

	let authenticationProvider = new ScalableTeachingAuthenticationProvider(context.secrets);
	vscode.authentication.registerAuthenticationProvider(
		ScalableTeachingAuthenticationProvider.id,
		'ScalableTeaching',
		authenticationProvider
	);

	vscode.commands.executeCommand('setContext', 'scalableteaching.authenticated', await authenticationProvider.isAuthenticated());
	vscode.commands.executeCommand('setContext', 'scalableteaching.openedProject', false);

	vscode.window.registerFileDecorationProvider(new SelectedGrade);
	vscode.window.registerFileDecorationProvider(new NotSelectedGrade);
	vscode.window.registerFileDecorationProvider(new PartialSelectedGrade);
	vscode.workspace.registerTextDocumentContentProvider("scalable", new DocumentProvider);

	https.globalAgent.options.rejectUnauthorized = false;
	axios.interceptors.request.use(async (request) => {
		const serverName = server();
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

	let openCourseCommand = vscode.commands.registerCommand('scalableteaching.openCourse', openCourse);
	let openProjectCommand = vscode.commands.registerCommand('scalableteaching.openProject', openProject);
	let openFileCommand = vscode.commands.registerCommand('scalableteaching.openFile', openFile);
	let toggleGradeCommand = vscode.commands.registerCommand('scalableteaching.toggleGrade', toggleGrade);
	let setPartialGradeCommand = vscode.commands.registerCommand('scalableteaching.setPartialGrade', setPartialGrade);
	let discardGradingsCommand = vscode.commands.registerCommand('scalableteaching.discardGradings', discardGrading);
	let submitGradingsCommand = vscode.commands.registerCommand('scalableteaching.submitGradings', submitGradings);
	let signInCommand = vscode.commands.registerCommand('scalableteaching.signIn', () => signIn(context));
	let signOutCommands = vscode.commands.registerCommand('scalableteaching.signOut', () => signOut(authenticationProvider));

	context.subscriptions.push(openCourseCommand);
	context.subscriptions.push(openProjectCommand);
	context.subscriptions.push(openFileCommand);
	context.subscriptions.push(toggleGradeCommand);
	context.subscriptions.push(discardGradingsCommand);
	context.subscriptions.push(submitGradingsCommand);
	context.subscriptions.push(signInCommand);
	context.subscriptions.push(signOutCommands);
	context.subscriptions.push(setPartialGradeCommand);
}





// this method is called when your extension is deactivated
export function deactivate() {
}


class SelectedGrade implements vscode.FileDecorationProvider {
	onDidChangeFileDecorations?: vscode.Event<vscode.Uri | vscode.Uri[] | undefined> | undefined;
	provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
		const showCountFor = "/selectedGrade";
		if (uri.path === showCountFor) {
			return {
				color: new vscode.ThemeColor("gitDecoration.addedResourceForeground"),
			};
		}
	}
}

class NotSelectedGrade implements vscode.FileDecorationProvider {
	onDidChangeFileDecorations?: vscode.Event<vscode.Uri | vscode.Uri[] | undefined> | undefined;
	provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
		const showCountFor = "/notSelectedGrade";
		if (uri.path === showCountFor) {
			return {
				color: new vscode.ThemeColor("gitDecoration.deletedResourceForeground"),
			};
		}
	}
}

class PartialSelectedGrade implements vscode.FileDecorationProvider {
	onDidChangeFileDecorations?: vscode.Event<vscode.Uri | vscode.Uri[] | undefined> | undefined;
	provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
		const showCountFor = "/partialSelectedGrade";
		if (uri.path === showCountFor) {
			return {
				color: new vscode.ThemeColor("gitDecoration.modifiedResourceForeground"),
			};
		}
	}
}