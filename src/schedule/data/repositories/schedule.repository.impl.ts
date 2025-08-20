import { HttpStatus, Injectable } from "@nestjs/common";
import { ScheduleI } from "src/schedule/domain/entities/ScheduleI";
import { ScheduleRepository } from "src/schedule/domain/repositories/ScheduleRepository";
import { CreateScheduleDto } from "../dtos/create-schedule.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ScheduleEntity } from "../entities/schedule.entity";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>
    ) {}

    async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleI> {
        try {
            const schedule = this.scheduleRepository.create(createScheduleDto);
            return await this.scheduleRepository.save(schedule);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll(): Promise<ScheduleI[]> {
        try {
            return await this.scheduleRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
    
}