export interface Project
{
    id: number,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    repo_name: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    task_id: number,
    status: "active" | "finished" | "overdue"
}