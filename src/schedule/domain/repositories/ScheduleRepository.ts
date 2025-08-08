import { CreateScheduleDto } from "src/schedule/data/dtos/create-schedule.dto";
import { ScheduleI } from "../entities/ScheduleI";

export interface ScheduleRepository {
    create(createScheduleDto: CreateScheduleDto): Promise<ScheduleI>;
    findAll(): Promise<ScheduleI[]>;
}