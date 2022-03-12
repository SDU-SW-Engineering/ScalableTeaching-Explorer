import * as vscode from 'vscode';

export default function (): null | URL {
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