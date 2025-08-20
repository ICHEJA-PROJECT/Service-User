import { CreateSchedulePersonDto } from "src/schedule/data/dtos/create-schedule-person.dto";
import { SchedulePersonI } from "../entities/SchedulePersonI";

export interface SchedulePersonRepository {
    create(createSchedulePersonDto: CreateSchedulePersonDto): Promise<SchedulePersonI>;
    findOne(scheduleId: number, personId: number): Promise<SchedulePersonI | null>;
    findByPerson(personId: number): Promise<SchedulePersonI[]>;
}