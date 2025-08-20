import { Controller } from "@nestjs/common";
import { RoadTypeService } from "../services/road_type.service";
import { MessagePattern } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('road-types')
export class RoadTypeController {
    constructor(private readonly roadTypeService: RoadTypeService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.ROAD_TYPE_FIND_ALL })
    async findAll() {
        return await this.roadTypeService.findAll();
    }
}