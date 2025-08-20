import { HttpStatus, Injectable } from "@nestjs/common";
import { InstitutionI } from "src/cell/domain/entitiesI/InstitutionI";
import { InstitutionRepository } from "src/cell/domain/repositories/InstitutionRepository";
import { CreateInstitutionDto } from "../dtos/create-institution.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { InstitutionEntity } from "../entities/institution.entity";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class InstitutionRepositoryImpl implements InstitutionRepository {
    constructor(
        @InjectRepository(InstitutionEntity)
        private readonly institutionRepository: Repository<InstitutionEntity>,
    ) {}

    async create(createInstitutionDto: CreateInstitutionDto): Promise<InstitutionI> {
        try {
            const institution = this.institutionRepository.create(createInstitutionDto);
            return await this.institutionRepository.save(institution);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll(): Promise<InstitutionI[]> {
        try {
            return await this.institutionRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number): Promise<InstitutionI> {
        try {
            return await this.institutionRepository.findOneOrFail({where: {id}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
    
}