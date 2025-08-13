import { Controller } from "@nestjs/common";
import { InstitutionService } from "../services/institution.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateInstitutionDto } from "../data/dtos/create-institution.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('institutions')
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.INSTITUTION_CREATE })
    async create(@Payload() createInstitutionDto: CreateInstitutionDto) {
        return await this.institutionService.create(createInstitutionDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.INSTITUTION_FIND_ALL })
    async findAll() {
        return await this.institutionService.findAll();
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.INSTITUTION_FIND_BY_ID })
    async findById(@Payload() id: number) {
        return await this.institutionService.findOne(id);
    }
}