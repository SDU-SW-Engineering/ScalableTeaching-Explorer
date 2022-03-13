import { File } from "./file";

export interface Directory
{
    name: string,
    directories: Directory[],
    files: File[]
}