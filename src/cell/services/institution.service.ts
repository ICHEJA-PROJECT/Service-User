import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InstitutionRepositoryImpl } from "../data/repositories/institution.repository.impl";
import { InstitutionRepository } from "../domain/repositories/InstitutionRepository";
import { CreateInstitutionDto } from "../data/dtos/create-institution.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class InstitutionService {
    constructor(
        @Inject(InstitutionRepositoryImpl)
        private readonly institutionRepository: InstitutionRepository,
    ) {}

    async create(createInstitutionDto: CreateInstitutionDto) {
        try {
            return await this.institutionRepository.create(createInstitutionDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll() {
        try {
            return await this.institutionRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number) {
        try {
            return await this.institutionRepository.findOne(id);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}