import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { RoleI } from "./RoleI";
import { SchedulePersonI } from "src/schedule/domain/entities/SchedulePersonI";

export interface RolePersonI {
    id: number;
    person: PersonI;
    role: RoleI;
    schedules: SchedulePersonI[];
}