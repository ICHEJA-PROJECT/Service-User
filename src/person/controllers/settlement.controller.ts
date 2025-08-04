import { Controller } from "@nestjs/common";
import { SettlementService } from "../services/settlement.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('settlements')
export class SettlementController {
    constructor(private readonly settlementService: SettlementService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SETTLEMENT_FIND_BY_ZIPCODE })
    async findByZipcode(@Payload() zipcode: string ){
        return await this.settlementService.findByZipcode(zipcode);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.SETTLEMENT_FIND_BY_MUNICIPALITY_AND_TOWN })
    async findByMunicipalityAndTown(@Payload() { municipalityId, townId }: { municipalityId: number, townId: number}) {
        return await this.settlementService.findByMunicipalityAndTown(municipalityId, townId);
    }
}