import * as vscode from 'vscode';
import Axios from 'axios';
import { Courses } from './courses';
import { GradingTree } from './trees/grading/gradingTree';


export function activate(context: vscode.ExtensionContext) {


	console.log('Loaded');
	vscode.commands.executeCommand('setContext', 'scalableteaching.authenticated', context.globalState.get('authenticated') === true);
	
	let view = vscode.window.createTreeView('scalable.courses', {
		"treeDataProvider": new Courses
	});
	view.title = "Updated!";

	vscode.commands.registerCommand('scalableteaching.openCourse', async(id) => {
		let test = await vscode.window.showQuickPick(new Promise((resolve, reject) => {
			setTimeout(() => resolve(["hello"]), 2000);
		}), {
			"title": "Open course...",
		});
		if (test === undefined)
			return;
		vscode.commands.executeCommand("setContext", "scalableteaching.openedCourse", 11);
		
	//	vscode.window.showInformationMessage("hey " + id);
	//	vscode.window.registerTreeDataProvider("scalable.feedback.list", new GradingTree);
	});

	let signInCommand = vscode.commands.registerCommand('scalableteaching.signIn', async () => {
		vscode.window.withProgress({
			"location": vscode.ProgressLocation.Notification,
			"cancellable": false,
			"title": "Attempting to sign you in..."
		}, async(progress) => {
			const token = (Math.random() + 1).toString(36).substring(2);
			vscode.env.openExternal(vscode.Uri.parse(`http://localhost:8080/vs-code/authenticate?token=${token}`));
			let tries = 0;
			while (tries < 3)
			{
				await new Promise(r => setTimeout(r, 3000));
				console.log("Sign in attempt: " + (tries+1));
				try
				{
					let response = await Axios.get(`http://localhost:8080/vs-code/retrieve-authentication?token=${token}`);
					console.log(response.data);
					context.globalState.update('token' , response.data.token);
					context.globalState.update('name', response.data.name);
					context.globalState.update('authenticated', true);
					vscode.commands.executeCommand('setContext', 'scalableteaching.test', false);
					vscode.window.showInformationMessage("Authenticated.");
					

					return;
				} catch (ignored){}
				tries++;
			}	
			vscode.window.showErrorMessage("Authentication timed-out.");
		});
		
		

	});

	context.subscriptions.push(signInCommand);
}



// this method is called when your extension is deactivated
export function deactivate() {}
