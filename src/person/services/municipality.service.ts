import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MunicipalityRepositoryImpl } from "../data/repositories/municipality.repository.impl";
import { MunicipalityRepository } from "../domain/repositories/MunicipalityRepository";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class MunicipalityService {
    constructor(
        @Inject(MunicipalityRepositoryImpl)
        private readonly municipalityRepository: MunicipalityRepository
    ) {}

    async findByState(stateId: number) {
        try {
            return await this.municipalityRepository.findByState(stateId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}