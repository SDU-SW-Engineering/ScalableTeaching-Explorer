import axios from 'axios';
import * as vscode from 'vscode';


export class DocumentProvider implements vscode.TextDocumentContentProvider {
    async provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Promise<string | null> {
        let params = new Map<string, string>();

        uri.query.split('&').forEach(f => {
            let parts = f.split("=");
            params.set(parts[0], parts[1]);
        });

        let file = params.get("file");
        let url = params.get("url");
    
        if (url === undefined || file === undefined)
        {
            vscode.window.showErrorMessage("Failed to open file");
            return null;
        }

        try
        {
            let response = await axios.post(url, {
                file: file
            });
            return response.data.file;
        }
        catch (error)
        {
            console.log(error);
            return null;
        }
        
    }

}