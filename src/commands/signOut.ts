import * as vscode from 'vscode';
import { ScalableTeachingAuthenticationProvider } from '../authProvider';

export default async function(authProvider: vscode.AuthenticationProvider) {
    authProvider.removeSession("");
}