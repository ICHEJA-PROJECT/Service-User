import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SettlementRepository } from "src/person/domain/repositories/SettlementRepository";
import { SettlementEntity } from "../entities/settlement.entity";
import { Repository } from "typeorm";
import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class SettlementRepositoryImpl implements SettlementRepository {
    constructor(@InjectRepository(SettlementEntity) private readonly settlementRepository: Repository<SettlementEntity>) {}

    findAll(): Promise<SettlementI[]> {
        throw new Error("Method not implemented.");
    }

    async findByZipcode(zipcode: string): Promise<SettlementI[]> {
        try {
            return this.settlementRepository.find({where: {zipcode: {code: zipcode}}, relations: {municipality: {state: true}, town: true}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByMunicipality(municipalityId: number): Promise<SettlementI[]> {
        try {
            return this.settlementRepository.find({ where: {municipality: {id: municipalityId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByMunicipalityAndTown(municipalityId: number, townId: number): Promise<SettlementI[]> {
        try {
            return this.settlementRepository.find({ where: {municipality: {id: municipalityId}, town: {id: townId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}