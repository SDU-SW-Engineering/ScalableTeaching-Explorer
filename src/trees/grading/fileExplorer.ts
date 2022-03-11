import { Event, ProviderResult, TreeDataProvider, TreeItem, TreeView } from "vscode";

export class FileExplorer implements TreeDataProvider<File>
{
    onDidChangeTreeData?: Event<void | File | null | undefined> | undefined;
    getTreeItem(element: File): TreeItem | Thenable<TreeItem> {
        throw new Error("Method not implemented.");
    }
    getChildren(element?: File): ProviderResult<File[]> {
        throw new Error("Method not implemented.");
    }

}

class File extends TreeItem
{

}