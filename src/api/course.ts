import internal = require("stream");

export interface Course
{
    id: number,
    name: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    members_count: string
}