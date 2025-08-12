import { StudentI } from "./StudentI";

export interface ProgenitorI {
    id: number;
    firstName: string;
    middleName: string;
    paternalSurname: string;
    maternalSurname: string;
    students: StudentI[];
}