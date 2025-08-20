import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherCellRepository } from "src/cell/domain/repositories/TeacherCellRepository";
import { TeacherCellEntity } from "../entities/teacher_cell.entity";
import { Repository } from "typeorm";
import { TeacherCellI } from "src/cell/domain/entitiesI/TeacherCellI";
import { CreateTeacherCellDto } from "../dtos/create-teacher-cell.dto";
import { RpcException } from "@nestjs/microservices";
import { PersonEntity } from "src/person/data/entities/person.entity";
import { CellEntity } from "../entities/cell.entity";

@Injectable()
export class TeacherCellRepositoryImpl implements TeacherCellRepository {
    constructor(
        @InjectRepository(TeacherCellEntity)
        private readonly teacherCellRepository: Repository<TeacherCellEntity>,
        @InjectRepository(PersonEntity)
        private readonly personRepository: Repository<PersonEntity>,
        @InjectRepository(CellEntity)
        private readonly cellRepository: Repository<CellEntity>,
    ) {}

    async create(createTeacherCellDto: CreateTeacherCellDto): Promise<TeacherCellI> {
        try {
            const cell = await this.cellRepository.findOne({where: {id: createTeacherCellDto.cellId}});
            if(!cell) throw new RpcException({
                message: 'No existe la celula seleccionada',
                status: HttpStatus.NOT_FOUND
            });

            const teacher = await this.personRepository.findOne({where: {id: createTeacherCellDto.teacherId}});
            if(!teacher) throw new RpcException({
                message: 'No existe el educador seleccionado.',
                status: HttpStatus.NOT_FOUND
            });

            const teacherCell = this.teacherCellRepository.create({
                ...createTeacherCellDto,
                cell: cell,
                teacher: teacher
            });

            return await this.teacherCellRepository.save(teacherCell);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}