import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RoadTypeRepositoryImpl } from "../data/repositories/road_type.repository.impl";
import { RoadTypeRepository } from "../domain/repositories/RoadTypeRepository";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RoadTypeService {
    constructor(@Inject(RoadTypeRepositoryImpl) private readonly roadTypeRepository: RoadTypeRepository) {}

    async findAll() {
        try {
            return await this.roadTypeRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}