import { SchedulePersonI } from "./SchedulePersonI";

export interface ScheduleI {
    id: number;
    day: string;
    hour: string;
    schedulePeople: SchedulePersonI[];
}