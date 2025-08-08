import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleEntity } from "./data/entities/schedule.entity";
import { SchedulePersonEntity } from "./data/entities/schedule_person.entity";
import { RoleModule } from "src/role/role.module";
import { ScheduleController } from "./controllers/schedule.controller";
import { SchedulePersonController } from "./controllers/schedule_person.controller";
import { ScheduleRepositoryImpl } from "./data/repositories/schedule.repository.impl";
import { SchedulePersonRepositoryImpl } from "./data/repositories/schedule_person.repository.impl";
import { ScheduleService } from "./services/schedule.service";
import { SchedulePersonService } from "./services/schedule_person.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScheduleEntity,
            SchedulePersonEntity,
        ]),
        RoleModule
    ],
    controllers: [
        ScheduleController,
        SchedulePersonController
    ],
    providers: [
        ScheduleRepositoryImpl,
        SchedulePersonRepositoryImpl,
        ScheduleService,
        SchedulePersonService
    ]
})
export class ScheduleModule {}