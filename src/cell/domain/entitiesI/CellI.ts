import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { InstitutionI } from "./InstitutionI";
import { TeacherCellI } from "./TeacherCellI";

export interface CellI {
    id: number;
    institution: InstitutionI;
    coordinator: PersonI;
    startDate: Date;
    endDate: Date;
    teachers: TeacherCellI[];
}