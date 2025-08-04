import { RoadTypeI } from "./RoadTypeI";
import { SettlementI } from "./SettlementI";

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
}