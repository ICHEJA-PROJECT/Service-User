import { Controller } from "@nestjs/common";
import { TeacherCellService } from "../services/teacher_cell.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateTeacherCellDto } from "../data/dtos/create-teacher-cell.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('teacherCell')
export class TeacherCellController {
    constructor(private readonly teacherCellService: TeacherCellService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.TEACHER_CELL_CREATE})
    async create(@Payload() createTeacherCellDto: CreateTeacherCellDto) {
        return await this.teacherCellService.create(createTeacherCellDto);
    }
}