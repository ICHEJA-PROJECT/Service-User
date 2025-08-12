import { Module } from "@nestjs/common";
import { PersonController } from "./controllers/person.controller";
import { PersonRepositoryImpl } from "./data/repositories/person.repository.impl";
import { PersonService } from "./services/person.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonEntity } from "./data/entities/person.entity";
import { ZipcodeEntity } from "./data/entities/zipcode.entity";
import { StateEntity } from "./data/entities/state.entity";
import { MunicipalityEntity } from "./data/entities/municipality.entity";
import { TownEntity } from "./data/entities/town.entity";
import { SettlementTypeEntity } from "./data/entities/settlement_type.entity";
import { RoadTypeEntity } from "./data/entities/road_type.entity";
import { SettlementEntity } from "./data/entities/settlement.entity";
import { HashDataRepositoryImpl } from "./data/repositories/hash_data.repository.impl";
import { RoadTypeController } from "./controllers/road_type.controller";
import { RoadTypeRepositoryImpl } from "./data/repositories/road_type.repository.impl";
import { RoadTypeService } from "./services/road_type.service";
import { SettlementController } from "./controllers/settlement.controller";
import { SettlementRepositoryImpl } from "./data/repositories/settlement.repository.impl";
import { SettlementService } from "./services/settlement.service";
import { MunipalicityController } from "./controllers/municipality.controller";
import { MunicipalityRepositoryImpl } from "./data/repositories/municipality.repository.impl";
import { MunicipalityService } from "./services/municipality.service";
import { TownController } from "./controllers/town.controller";
import { TownRepositoryImpl } from "./data/repositories/town.repository.impl";
import { TownService } from "./services/town.service";
import { UploadImageTransport } from "src/shared/transports/upload-image.transport";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ZipcodeEntity,
            StateEntity,
            MunicipalityEntity,
            TownEntity,
            SettlementTypeEntity,
            RoadTypeEntity,
            SettlementEntity,
            PersonEntity,

        ]),
        UploadImageTransport
    ],
    controllers: [
        PersonController,
        RoadTypeController,
        SettlementController,
        MunipalicityController,
        TownController,
    ],
    providers: [
        PersonRepositoryImpl,
        RoadTypeRepositoryImpl,
        HashDataRepositoryImpl,
        SettlementRepositoryImpl,
        MunicipalityRepositoryImpl,
        TownRepositoryImpl,
        PersonService,
        RoadTypeService,
        SettlementService,
        MunicipalityService,
        TownService,
    ],
    exports: [
        TypeOrmModule
    ]
})
export class PersonModule {}