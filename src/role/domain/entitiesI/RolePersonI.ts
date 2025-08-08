import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { RoleI } from "./RoleI";

export interface RolePersonI {
    id: number;
    person: PersonI;
    role: RoleI;
}