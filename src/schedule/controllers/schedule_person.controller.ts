import { Controller } from "@nestjs/common";
import { SchedulePersonService } from "../services/schedule_person.service";
import { CreateSchedulePersonDto } from "../data/dtos/create-schedule-person.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('schedules-person')
export class SchedulePersonController {
    constructor(private readonly schedulePersonService: SchedulePersonService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SCHEDULE_PERSON_CREATE })
    async create(@Payload() createSchedulePersonDto: CreateSchedulePersonDto) {
        return await this.schedulePersonService.create(createSchedulePersonDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SCHEDULE_PERSON_FIND_BY_PERSON })
    async getByPerson(@Payload() personId: number) {
        return await this.schedulePersonService.findByPerson(personId);
    }
}