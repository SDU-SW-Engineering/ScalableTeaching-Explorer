import { Project } from './project';

export interface Task {
    id: number,
    name: string,
    projects: Project[]
}