import { HttpStatus, Injectable } from "@nestjs/common";
import { ProgenitorI } from "src/student/domain/entitiesI/ProgenitorI";
import { ProgenitorRepository } from "src/student/domain/repositories/ProgenitorRepository";
import { CreateProgenitorDto } from "../dtos/create-progenitor.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProgenitorEntity } from "../entities/progenitor.entity";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ProgenitorRepositoryImpl implements ProgenitorRepository {
    constructor(
        @InjectRepository(ProgenitorEntity)
        private readonly progenitorRepository: Repository<ProgenitorEntity>
    ) {}

    async create(createProgenitorDto: CreateProgenitorDto): Promise<ProgenitorI> {
        try {
            const progenitor = this.progenitorRepository.create(createProgenitorDto);
            return await this.progenitorRepository.save(progenitor);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
    
    async findByCurp(curp: string): Promise<ProgenitorI | null> {
        try {
            return await this.progenitorRepository.findOne({where: {curp}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}