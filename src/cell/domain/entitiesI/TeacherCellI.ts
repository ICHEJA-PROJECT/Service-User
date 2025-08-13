import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { CellI } from "./CellI";

export interface TeacherCellI {
    teacher: PersonI;
    cell: CellI;
}