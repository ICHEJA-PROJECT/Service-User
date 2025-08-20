import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { RoadTypeI } from "src/person/domain/entitiesI/RoadTypeI";
import { RoadTypeRepository } from "src/person/domain/repositories/RoadTypeRepository";
import { RoadTypeEntity } from "../entities/road_type.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoadTypeRepositoryImpl implements RoadTypeRepository {
    constructor(@InjectRepository(RoadTypeEntity) private readonly roadTypeRepository: Repository<RoadTypeEntity>) {}

    async findAll(): Promise<RoadTypeI[]> {
        try {
            return await this.roadTypeRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}