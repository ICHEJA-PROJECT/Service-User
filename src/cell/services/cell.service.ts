import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CellRepositoryImpl } from "../data/repositories/cell.repository.impl";
import { CellRepository } from "../domain/repositories/CellRepository";
import { CreateCellDto } from "../data/dtos/create-cell.dto";
import { RpcException } from "@nestjs/microservices";
import { PersonService } from "src/person/services/person.service";

@Injectable()
export class CellService{
    constructor(
        @Inject(CellRepositoryImpl)
        private readonly cellRepository: CellRepository,
        private readonly personService: PersonService,
    ) {}

    async create(createCellDto: CreateCellDto) {
        try {
            const coordinator = await this.personService.findOne(createCellDto.coordinatorId);

            const coordinatorRol = coordinator.roles.find(roleItem => roleItem.role.id === 3);
            if(!coordinatorRol) throw new RpcException({
                message: 'La persona como coordinador, no cuenta con ese rol.',
                status: HttpStatus.CONFLICT,
            });

            return await this.cellRepository.create(createCellDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll() {
        try {
            return await this.cellRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByInstitution(institutionId: number) {
        try {
            return await this.cellRepository.findByInstitution(institutionId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByCoordinator(coordinatorId: number) {
        try {
            return await this.cellRepository.findByCoordinator(coordinatorId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number) {
        try {
            return await this.cellRepository.findOne(id);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}