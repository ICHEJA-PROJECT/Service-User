import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ScheduleRepositoryImpl } from "../data/repositories/schedule.repository.impl";
import { ScheduleRepository } from "../domain/repositories/ScheduleRepository";
import { CreateScheduleDto } from "../data/dtos/create-schedule.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ScheduleService {
    constructor(
        @Inject(ScheduleRepositoryImpl)
        private readonly scheduleRepository: ScheduleRepository
    ) {}

    async create(createScheduleDto: CreateScheduleDto) {
        try {
            return await this.scheduleRepository.create(createScheduleDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll() {
        try {
            return await this.scheduleRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}