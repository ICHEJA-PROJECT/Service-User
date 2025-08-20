import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { RoadTypeI } from "./RoadTypeI";
import { SettlementI } from "./SettlementI";
import { StudentI } from "src/student/domain/entitiesI/StudentI";
import { CellI } from "src/cell/domain/entitiesI/CellI";

export interface PersonI {
    id: number;
    firstName: string;
    middleName: string;
    paternalSurname: string;
    maternalSurname: string;
    curp: string;
    ineNumber: string;
    birthdate: Date;
    gender: string;
    roadName: string;
    roadType: RoadTypeI;
    settlement: SettlementI;
    password: string;
    profileImagePath: string;
    roles: RolePersonI[];
    student?: StudentI;
    cells?: CellI[];
}