import { CreateRolePersonDto } from "src/role/data/dtos/create-role-person.dto";
import { RolePersonI } from "../entitiesI/RolePersonI";

export interface RolePersonRepository {
    create(createRolePersonDto: CreateRolePersonDto): Promise<RolePersonI>;
}