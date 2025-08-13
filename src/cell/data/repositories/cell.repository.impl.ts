import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CellRepository } from "src/cell/domain/repositories/CellRepository";
import { CellEntity } from "../entities/cell.entity";
import { Repository } from "typeorm";
import { CellI } from "src/cell/domain/entitiesI/CellI";
import { CreateCellDto } from "../dtos/create-cell.dto";
import { RpcException } from "@nestjs/microservices";
import { PersonEntity } from "src/person/data/entities/person.entity";
import { InstitutionEntity } from "../entities/institution.entity";

@Injectable()
export class CellRepositoryImpl implements CellRepository {
    constructor(
        @InjectRepository(CellEntity)
        private readonly cellRepository: Repository<CellEntity>,
        @InjectRepository(PersonEntity)
        private readonly personRepository: Repository<PersonEntity>,
        @InjectRepository(InstitutionEntity)
        private readonly institutionRepository: Repository<InstitutionEntity>
    ) {}
    
    async create(createCellDto: CreateCellDto): Promise<CellI> {
        try {
            const coordinator = await this.personRepository.findOne({where: {id: createCellDto.coordinatorId}});

            if(!coordinator) throw new RpcException({
                message: 'No existe el coordinador seleccionado.',
                status: HttpStatus.NOT_FOUND
            });

            const institution = await this.institutionRepository.findOne({where: {id: createCellDto.institutionId}});

            if(!institution) throw new RpcException({
                message: 'No existe la institucion seleccionada.',
                status: HttpStatus.NOT_FOUND,
            })

            const cell = this.cellRepository.create({
                ...createCellDto,
                coordinator: coordinator,
                institution: institution
            });

            return await this.cellRepository.save(cell);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll(): Promise<CellI[]> {
        try {
            return await this.cellRepository.find({ relations: {coordinator: true}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByInstitution(institutionId: number): Promise<CellI[]> {
        try {
            return await this.cellRepository.find({ where: { institution: {id: institutionId}}, relations: {coordinator: true}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByCoordinator(coordinatorId: number): Promise<CellI[]> {
        try {
            return await this.cellRepository.find({ where: { coordinator: {id: coordinatorId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number): Promise<CellI> {
        try {
            return await this.cellRepository.findOneOrFail({ where: { id}, relations: {coordinator: true, teachers: {teacher: true}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}