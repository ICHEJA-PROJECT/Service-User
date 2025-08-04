import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { PersonRepository } from "src/person/domain/repositories/PersonRepository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonEntity } from "../entities/person.entity";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";
import { CreatePersonDto } from "../dtos/create-person.dto";
import { RoadTypeEntity } from "../entities/road_type.entity";
import { SettlementEntity } from "../entities/settlement.entity";

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {
    constructor(
        @InjectRepository(PersonEntity) 
        private readonly personRepository: Repository<PersonEntity>,
        @InjectRepository(RoadTypeEntity)
        private readonly roadTypeRepository: Repository<RoadTypeEntity>,
        @InjectRepository(SettlementEntity)
        private readonly settlementRpeository: Repository<SettlementEntity>,
    ) {}

    async create(createPersonDto: CreatePersonDto): Promise<PersonI> {
        try {
            const roadType = await this.roadTypeRepository.findOneOrFail({where: {id: createPersonDto.roadTypeId}});
            const settlement = await this.settlementRpeository.findOneOrFail({where: {id: createPersonDto.settlementId}});
            const person = this.personRepository.create({
                ...createPersonDto,
                roadType,
                settlement
            });
            console.log(person);
            return await this.personRepository.save(person);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number): Promise<PersonI> {
        try {
            const person = await this.personRepository.findOneOrFail(
                {
                    where: {id}, 
                    relations: {
                        roadType: true, 
                        settlement: {
                            municipality: true, 
                            settlementType: true, 
                            zipcode: true, 
                            town: true
                        }
                    }
                }
            );
            return person;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}