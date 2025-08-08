import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RolePersonRepositoryImpl } from "../data/repositories/role_person.repository.impl";
import { RolePersonRepository } from "../domain/repositories/RolePersonRepository";
import { CreateRolePersonDto } from "../data/dtos/create-role-person.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RolePersonService {
    constructor(
        @Inject(RolePersonRepositoryImpl) 
        private readonly rolePersonRepository: RolePersonRepository
    ) {}

    async create(createRolePersonDto: CreateRolePersonDto) {
        try {
            return await this.rolePersonRepository.create(createRolePersonDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}