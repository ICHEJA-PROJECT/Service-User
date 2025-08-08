import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SchedulePersonRepositoryImpl } from "../data/repositories/schedule_person.repository.impl";
import { SchedulePersonRepository } from "../domain/repositories/SchedulePersonRepository";
import { RpcException } from "@nestjs/microservices";
import { CreateSchedulePersonDto } from "../data/dtos/create-schedule-person.dto";
import { RolePersonRepositoryImpl } from "src/role/data/repositories/role_person.repository.impl";
import { RolePersonRepository } from "src/role/domain/repositories/RolePersonRepository";
import { RolePersonService } from "src/role/services/role_person.service";

@Injectable()
export class SchedulePersonService{
    constructor(
        @Inject(SchedulePersonRepositoryImpl)
        private readonly schedulePersonRepository: SchedulePersonRepository,
        private readonly rolePersonService: RolePersonService
    ) {}

    async create(createSchedulePersonDto: CreateSchedulePersonDto) {
        try {
            const rolePerson = await this.rolePersonService.findOne(createSchedulePersonDto.rolePersonId);
            const schedulePerson = await this.schedulePersonRepository.findOne(createSchedulePersonDto.scheduleId, rolePerson.person.id);
            if(schedulePerson) {
                throw new RpcException({
                    message: 'La persona ya tiene registrado este horario',
                    status: HttpStatus.CONFLICT
                });
            }
            return await this.schedulePersonRepository.create(createSchedulePersonDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByPerson(personId: number) {
        try {
            return await this.schedulePersonRepository.findByPerson(personId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}