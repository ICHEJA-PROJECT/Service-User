import { HttpStatus, Injectable } from "@nestjs/common";
import { SchedulePersonI } from "src/schedule/domain/entities/SchedulePersonI";
import { SchedulePersonRepository } from "src/schedule/domain/repositories/SchedulePersonRepository";
import { CreateSchedulePersonDto } from "../dtos/create-schedule-person.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SchedulePersonEntity } from "../entities/schedule_person.entity";
import { RpcException } from "@nestjs/microservices";
import { ScheduleEntity } from "../entities/schedule.entity";
import { RolePersonEntity } from "src/role/data/entities/role-person.entity";

@Injectable()
export class SchedulePersonRepositoryImpl implements SchedulePersonRepository {
    constructor(
        @InjectRepository(SchedulePersonEntity)
        private readonly schedulePersonRepository: Repository<SchedulePersonEntity>,
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
        @InjectRepository(RolePersonEntity)
        private readonly rolePersonRepository: Repository<RolePersonEntity>

    ) {}

    async create(createSchedulePersonDto: CreateSchedulePersonDto): Promise<SchedulePersonI> {
        try {
            const schedule = await this.scheduleRepository.findOneOrFail({where: {id: createSchedulePersonDto.scheduleId}});
            const rolePerson = await this.rolePersonRepository.findOneOrFail({where: {id: createSchedulePersonDto.rolePersonId}});
            const schedulePerson = this.schedulePersonRepository.create({
                ...createSchedulePersonDto,
                schedule,
                rolePerson
            });
            return await this.schedulePersonRepository.save(schedulePerson);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(scheduleId: number, personId: number): Promise<SchedulePersonI | null> {
        try {
            return await this.schedulePersonRepository.findOne({where: {scheduleId, rolePerson: {person: { id: personId }}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByPerson(personId: number): Promise<SchedulePersonI[]> {
        try {
            return await this.schedulePersonRepository.find({
                where: { 
                    rolePerson: { 
                        person: { 
                            id: personId
                        }
                    }
                },
                relations: {
                    rolePerson: { 
                        role: true
                    },
                    schedule: true
                }
            });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}