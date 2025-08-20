import { RolePersonI } from "./RolePersonI";

export interface RoleI {
    id: number;
    name: string;
    people: RolePersonI[];
}