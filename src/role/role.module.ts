import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./data/entities/role.entity";
import { RolePersonEntity } from "./data/entities/role-person.entity";
import { PersonModule } from "src/person/person.module";
import { RoleController } from "./controllers/role.controller";
import { RolePersonController } from "./controllers/role_person.controller";
import { RoleRepositoryImpl } from "./data/repositories/role.repository.impl";
import { RoleService } from "./services/role.service";
import { RolePersonRepositoryImpl } from "./data/repositories/role_person.repository.impl";
import { RolePersonService } from "./services/role_person.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            RolePersonEntity
        ]),
        PersonModule,
    ],
    controllers: [
        RoleController,
        RolePersonController,
    ],
    providers: [
        RoleRepositoryImpl,
        RolePersonRepositoryImpl,
        RoleService,
        RolePersonService,
    ],
    exports: [
        TypeOrmModule,
        RolePersonService
    ]
})
export class RoleModule {}