import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstitutionEntity } from "./data/entities/institution.entity";
import { CellEntity } from "./data/entities/cell.entity";
import { TeacherCellEntity } from "./data/entities/teacher_cell.entity";
import { InstitutionController } from "./controllers/institution.controller";
import { InstitutionRepositoryImpl } from "./data/repositories/institution.repository.impl";
import { InstitutionService } from "./services/institution.service";
import { CellController } from "./controllers/cell.controller";
import { CellRepositoryImpl } from "./data/repositories/cell.repository.impl";
import { CellService } from "./services/cell.service";
import { PersonModule } from "src/person/person.module";
import { TeacherCellController } from "./controllers/teacher_cell.controller";
import { TeacherCellRepositoryImpl } from "./data/repositories/teacher_cell.repository.impl";
import { TeacherCellService } from "./services/teacher_cell.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            InstitutionEntity,
            CellEntity,
            TeacherCellEntity
        ]),
        PersonModule,
    ],
    controllers: [
        InstitutionController,
        CellController,
        TeacherCellController,
    ],
    providers: [
        InstitutionRepositoryImpl,
        CellRepositoryImpl,
        TeacherCellRepositoryImpl,
        InstitutionService,
        CellService,
        TeacherCellService,
    ]
})
export class CellModule {}