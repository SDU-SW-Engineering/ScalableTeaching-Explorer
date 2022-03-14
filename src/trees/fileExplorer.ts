import * as vscode from 'vscode';
import { Event, ProviderResult, TreeDataProvider, TreeItem, TreeView } from "vscode";
import { Directory as ApiDirectory } from "../api/directory";
import { Project } from "../api/project";
import { File as ApiFile } from "../api/file";

export class FileExplorer implements TreeDataProvider<File | Directory>
{
    public constructor(private project : Project, private directory : ApiDirectory, private courseId : number)
    {

    }
 
    getTreeItem(element: File): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: File): ProviderResult<(File | Directory)[]> {
        if (element === undefined)
        {
            let directories : Directory[] = this.directory.directories.map(d => new Directory(d));
            let files : File[] = this.directory.files.map(f => new File(f, this.project, this.courseId));
            return [...directories, ...files];
        }
        if (element instanceof Directory)
        {
            let directories : Directory[] = element.directory.directories.map(d => new Directory(d));
            let files : File[] = element.directory.files.map(f => new File(f, this.project, this.courseId));
            return [...directories, ...files];
        }
        return [];
    }

}

class File extends TreeItem
{
    public constructor(public file : ApiFile, public project : Project, courseId : number)
    {
        super({
            label: file.name,
        }, vscode.TreeItemCollapsibleState.None);
        this.iconPath = vscode.ThemeIcon.File;
        this.command = {
            command: "scalableteaching.openFile",
            title: "Open File",
            arguments: [file, project, courseId],
        };
    }
}

class Directory extends TreeItem
{
    public constructor(public directory : ApiDirectory)
    {
        super({
            label: directory.name,
        }, vscode.TreeItemCollapsibleState.Expanded);
        this.iconPath = vscode.ThemeIcon.Folder;
    }
}