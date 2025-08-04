import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SettlementRepositoryImpl } from "../data/repositories/settlement.repository.impl";
import { SettlementRepository } from "../domain/repositories/SettlementRepository";
import { RpcException } from "@nestjs/microservices";
import { getSettlementsByZipcodeAdapter } from "../data/adapters/get-settlements-by-zipcode.adapter";

@Injectable()
export class SettlementService {
    constructor(
        @Inject(SettlementRepositoryImpl) 
        private readonly settlementRepository: SettlementRepository
    ) {}

    async findByZipcode(zipcode: string) {
        try {
            const settlements = await this.settlementRepository.findByZipcode(zipcode);
            return getSettlementsByZipcodeAdapter(settlements);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByMunicipalityAndTown(municipalityId: number, townId: number | null) {
        try {
            if(townId) {
                return await this.settlementRepository.findByMunicipalityAndTown(municipalityId, townId);
            } else {
                return await this.settlementRepository.findByMunicipality(municipalityId);
            }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}