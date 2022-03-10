import * as vscode from 'vscode';

export class DocumentViewer
{
    public start()
    {
            const commentController = vscode.comments.createCommentController('comment-sample', 'Scalable Comment');
	        commentController.commentingRangeProvider = {
		"provideCommentingRanges": (document, token) =>  {
			if (document.uri.scheme !== 'scalable')
				return;
			const lineCount = document.lineCount;
			return [new vscode.Range(0, 0, lineCount - 1, 0)];
		}
	};
    }
}