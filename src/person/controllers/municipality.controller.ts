import { Controller } from "@nestjs/common";
import { MunicipalityService } from "../services/municipality.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('municipalities')
export class MunipalicityController {
    constructor(private readonly municipalityService: MunicipalityService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.MUNICIPALITY_FIND_BY_STATE })
    async findByState(@Payload() stateId: number) {
        return await this.municipalityService.findByState(stateId);
    }
}