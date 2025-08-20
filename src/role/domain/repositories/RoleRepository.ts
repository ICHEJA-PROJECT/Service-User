import { CreateRoleDto } from "src/role/data/dtos/create-role.dto";
import { RoleI } from "../entitiesI/RoleI";

export interface RoleRepository {
    create(createRoleDto: CreateRoleDto): Promise<RoleI>;
    findAll(): Promise<RoleI[]>;
}