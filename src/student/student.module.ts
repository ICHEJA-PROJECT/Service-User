import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./data/entities/student.entity";
import { ProgenitorEntity } from "./data/entities/progenitor.entity";
import { PersonModule } from "src/person/person.module";
import { PreferencesServiceTransport } from "src/shared/transports/preferences-service.transport";
import { StudentController } from "./controllers/student.controller";
import { UploadImageTransport } from "src/shared/transports/upload-image.transport";
import { StudentRepositoryImpl } from "./data/repositories/student.repository.impl";
import { StudentService } from "./services/student.service";
import { JwtModule } from "@nestjs/jwt";
import { envsValues } from "src/core/config/getEnvs";
import { EncryptDataRepositoryImpl } from "./data/repositories/encryptData.repository.impl";
import { QRRepositoryImpl } from "./data/repositories/qr.repository.impl";
import { ProgenitorRepositoryImpl } from "./data/repositories/progenitor.repository.impl";
import { ProgenitorService } from "./services/progenitor.service";
import { RoleModule } from "src/role/role.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StudentEntity,
            ProgenitorEntity
        ]),
        JwtModule.register({
            global: true,
            secret: envsValues.JWT_SECRET,
            signOptions: { expiresIn: envsValues.JWT_EXPIRATION }
        }),
        PersonModule,
        PreferencesServiceTransport,
        UploadImageTransport,
        RoleModule
    ],
    controllers: [
        StudentController
    ],
    providers: [
        ProgenitorRepositoryImpl,
        StudentRepositoryImpl,
        EncryptDataRepositoryImpl,
        QRRepositoryImpl,
        ProgenitorService,
        StudentService
    ]
})
export class StudentModule {}