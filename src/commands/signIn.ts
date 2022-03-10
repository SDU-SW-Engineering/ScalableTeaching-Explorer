import * as vscode from 'vscode';
import Axios from 'axios';
import { ScalableTeachingAuthenticationProvider } from '../authProvider';

export default async function (context: vscode.ExtensionContext) {


    try {
        const session = await vscode.authentication.getSession(ScalableTeachingAuthenticationProvider.id, [], { createIfNone: true });
        console.log(session);
    }
    catch ( e) { console.log("FAILED"); }

}