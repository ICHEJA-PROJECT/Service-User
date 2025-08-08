import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolePersonRepository } from "src/role/domain/repositories/RolePersonRepository";
import { RolePersonEntity } from "../entities/role-person.entity";
import { Repository } from "typeorm";
import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { CreateRolePersonDto } from "../dtos/create-role-person.dto";
import { RpcException } from "@nestjs/microservices";
import { PersonEntity } from "src/person/data/entities/person.entity";
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RolePersonRepositoryImpl implements RolePersonRepository {
    constructor(
        @InjectRepository(RolePersonEntity) 
        private readonly rolePersonRepository: Repository<RolePersonEntity>,
        @InjectRepository(PersonEntity)
        private readonly personRepository: Repository<PersonEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    async create(createRolePersonDto: CreateRolePersonDto): Promise<RolePersonI> {
        try {
            const role = await this.roleRepository.findOneOrFail({where:{id: createRolePersonDto.roleId}});
            const person = await this.personRepository.findOneOrFail({where:{id: createRolePersonDto.personId}});
            const rolePerson = this.rolePersonRepository.create({role, person});
            return await this.rolePersonRepository.save(rolePerson);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<RolePersonI> {
        try {
            return await this.rolePersonRepository.findOneOrFail({where: {id}, relations: {person: true, role: true}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}