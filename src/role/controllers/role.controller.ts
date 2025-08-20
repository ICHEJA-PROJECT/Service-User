import { Controller } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateRoleDto } from "../data/dtos/create-role.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.ROLE_CREATE})
    async create(@Payload() createRoleDto: CreateRoleDto) {
        return await this.roleService.create(createRoleDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.ROLE_FIND_ALL})
    async findAll() {
        return await this.roleService.findAll();
    }
}