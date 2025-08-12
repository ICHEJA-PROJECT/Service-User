import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProgenitorRepositoryImpl } from "../data/repositories/progenitor.repository.impl";
import { ProgenitorRepository } from "../domain/repositories/ProgenitorRepository";
import { RpcException } from "@nestjs/microservices";
import { CreateProgenitorDto } from "../data/dtos/create-progenitor.dto";

@Injectable()
export class ProgenitorService {
    constructor(
        @Inject(ProgenitorRepositoryImpl)
        private readonly progenitorRepository: ProgenitorRepository
    ) {}

    async create(createProgenitorDto: CreateProgenitorDto) {
        try {
            
            const progenitorSaved = await this.progenitorRepository.findByCurp(createProgenitorDto.curp);

            if(!progenitorSaved) {
                return await this.progenitorRepository.create(createProgenitorDto);
            }

        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}