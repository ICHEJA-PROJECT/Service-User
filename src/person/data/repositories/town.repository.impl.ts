import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TownRepository } from "src/person/domain/repositories/TownRepository";
import { TownEntity } from "../entities/town.entity";
import { Repository } from "typeorm";
import { TownI } from "src/person/domain/entitiesI/TownI";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class TownRepositoryImpl implements TownRepository {
    constructor(
        @InjectRepository(TownEntity) 
        private readonly townRepository: Repository<TownEntity>
    ) {}

    async findByMunicipality(municipalityId: number): Promise<TownI[]> {
        try {
            return await this.townRepository.find({where: {municipality: {id: municipalityId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}