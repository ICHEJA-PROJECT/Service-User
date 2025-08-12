import { Controller } from "@nestjs/common";
import { StudentService } from "../services/student.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateStudentDto } from "../data/dtos/create-student.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('students')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}
    
    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.STUDENT_CREATE })
    async create(@Payload() createStudentDto: CreateStudentDto) {
        return await this.studentService.create(createStudentDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_TEACHER })
    async findByTeacher(@Payload() teacherId: number) {
        return await this.studentService.findByTeacher(teacherId);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_CURP })
    async findByCurp(@Payload() curp: string) {
        return await this.studentService.findByCurp(curp);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_NAME })
    async findByName(@Payload() name: string) {
        return await this.studentService.findByName(name);
    }
}