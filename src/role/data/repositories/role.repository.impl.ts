import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleRepository } from "src/role/domain/repositories/RoleRepository";
import { RoleEntity } from "../entities/role.entity";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";
import { CreateRoleDto } from "../dtos/create-role.dto";
import { RoleI } from "src/role/domain/entitiesI/RoleI";

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
    constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) {}

    async create(createRoleDto: CreateRoleDto) {
        try {
            const role = this.roleRepository.create(createRoleDto);
            return await this.roleRepository.save(role);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<RoleI[]> {
        try {
            return await this.roleRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}