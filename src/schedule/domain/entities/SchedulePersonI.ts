import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { ScheduleI } from "./ScheduleI";

export interface SchedulePersonI {
    rolePerson: RolePersonI;
    schedule: ScheduleI;
}