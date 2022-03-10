import { Project } from "../views/tasks/project";

export interface Task {
    id: number,
    name: string,
    projects: Project[]
}