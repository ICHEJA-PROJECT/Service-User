import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { ProgenitorI } from "./ProgenitorI";

export interface StudentI {
    id: number;
    person: PersonI;
    teacher: PersonI | null;
    qrPath: string;
    father: ProgenitorI;
    mother: ProgenitorI;
}