import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TeacherCellRepositoryImpl } from "../data/repositories/teacher_cell.repository.impl";
import { TeacherCellRepository } from "../domain/repositories/TeacherCellRepository";
import { CreateTeacherCellDto } from "../data/dtos/create-teacher-cell.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class TeacherCellService {
    constructor(
        @Inject(TeacherCellRepositoryImpl)
        private readonly teacherCellRepository: TeacherCellRepository,
    ) {}

    async create(createTeacherCellDto: CreateTeacherCellDto) {
        try {
            return await this.teacherCellRepository.create(createTeacherCellDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            }); 
        }
    }
}