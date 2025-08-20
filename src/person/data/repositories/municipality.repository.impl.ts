import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MunicipalityRepository } from "src/person/domain/repositories/MunicipalityRepository";
import { Repository } from "typeorm";
import { MunicipalityEntity } from "../entities/municipality.entity";
import { MunicipalityI } from "src/person/domain/entitiesI/MunicipalityI";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class MunicipalityRepositoryImpl implements MunicipalityRepository {
    constructor(@InjectRepository(MunicipalityEntity) private readonly municipalityRepository: Repository<MunicipalityEntity>) {}

    async findByState(stateId: number): Promise<MunicipalityI[]> {
        try {
            return await this.municipalityRepository.find({where: {state: {id: stateId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}