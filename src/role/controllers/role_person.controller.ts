import { Controller } from "@nestjs/common";
import { RolePersonService } from "../services/role_person.service";
import { MessagePattern } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";
import { CreateRolePersonDto } from "../data/dtos/create-role-person.dto";

@Controller('rolePerson')
export class RolePersonController {
    constructor(private readonly rolePersonService: RolePersonService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.ROLE_PERSON_CREATE})
    async create(createRolePersonDto: CreateRolePersonDto) {
        return await this.rolePersonService.create(createRolePersonDto);
    }
}