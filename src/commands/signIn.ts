import * as vscode from 'vscode';
import Axios from 'axios';
import { ScalableTeachingAuthenticationProvider } from '../authProvider';

export default async function (context: vscode.ExtensionContext) {
    /*vscode.window.withProgress({
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
    });*/

    try {
        const session = await vscode.authentication.getSession(ScalableTeachingAuthenticationProvider.id, [], { createIfNone: true });
        console.log(session);
    }
    catch ( e) { console.log("FAILED"); }

}