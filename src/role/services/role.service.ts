import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RoleRepositoryImpl } from "../data/repositories/role.repository.impl";
import { RoleRepository } from "../domain/repositories/RoleRepository";
import { CreateRoleDto } from "../data/dtos/create-role.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RoleService {
    constructor(
        @Inject(RoleRepositoryImpl) 
        private readonly roleRepository: RoleRepository
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        try {
            return await this.roleRepository.create(createRoleDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll() {
        try {
            return await this.roleRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}