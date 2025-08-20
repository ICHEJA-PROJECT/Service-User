import { CreateStudentDto } from "src/student/data/dtos/create-student.dto";
import { StudentI } from "../entitiesI/StudentI";

export interface StudentRepository {
    create(createStudentDto: CreateStudentDto): Promise<StudentI>;
    findByTeacher(teacherId: number): Promise<StudentI[]>;
    updateQrPath(studentId: number, pathImageQr: string): Promise<void>;
    findByCurp(curp: string): Promise<StudentI[]>;
    findByName(firstName: string, paternalSurname: string): Promise<StudentI[]>;
}