import { Controller } from "@nestjs/common";
import { TownService } from "../services/town.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('towns')
export class TownController {
    constructor(private readonly townService: TownService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.TOWN_FIND_BY_MUNICIPALITY })
    async findByMunicipality(@Payload() municipalityId: number) {
        return await this.townService.findByMunicipality(municipalityId);
    }
}