import { Controller } from "@nestjs/common";
import { ScheduleService } from "../services/schedule.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateScheduleDto } from "../data/dtos/create-schedule.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('schedules')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SCHEDULE_CREATE })
    async create(@Payload() createScheduleDto: CreateScheduleDto) {
        return await this.scheduleService.create(createScheduleDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SCHEDULE_FIND_ALL })
    async findAll() {
        return await this.scheduleService.findAll();
    }
}