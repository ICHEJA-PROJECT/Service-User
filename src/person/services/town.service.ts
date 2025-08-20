import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TownRepositoryImpl } from "../data/repositories/town.repository.impl";
import { TownRepository } from "../domain/repositories/TownRepository";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class TownService {
    constructor(
        @Inject(TownRepositoryImpl)
        private readonly townRepository: TownRepository
    ) {}

    async findByMunicipality(municipalityId: number) {
        try {
            return await this.townRepository.findByMunicipality(municipalityId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}