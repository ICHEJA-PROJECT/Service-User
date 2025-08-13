import { CreateTeacherCellDto } from "src/cell/data/dtos/create-teacher-cell.dto";
import { TeacherCellI } from "../entitiesI/TeacherCellI";

export interface TeacherCellRepository {
    create(createTeacherCellDto: CreateTeacherCellDto): Promise<TeacherCellI>;
}