import { HttpStatus, Inject } from "@nestjs/common";
import { StudentRepositoryImpl } from "../data/repositories/student.repository.impl";
import { StudentRepository } from "../domain/repositories/StudentRepository";
import { HttpService } from "@nestjs/axios";
import { CreateStudentDto } from "../data/dtos/create-student.dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";
import { JwtService } from "@nestjs/jwt";
import { EncryptDataRepositoryImpl } from "../data/repositories/encryptData.repository.impl";
import { EncryptDataRepository } from "../domain/repositories/EncryptDataRepository";
import { QRRepositoryImpl } from "../data/repositories/qr.repository.impl";
import { QRRepository } from "../domain/repositories/QRRepository";
import { base64ToBuffer } from "src/shared/utils/base64ToBuffer";
import * as FormData from 'form-data';
import { RegisterStudentResponseAdapter } from "../data/adapters/register-student.adapter";
import { ProgenitorService } from "./progenitor.service";

export class StudentService {
    constructor(
        @Inject(StudentRepositoryImpl)
        private readonly studentRepository: StudentRepository,
        private readonly httpService: HttpService,
        @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
        private readonly preferencesClient: ClientProxy,
        private readonly jwtService: JwtService,
        @Inject(EncryptDataRepositoryImpl)
        private readonly encryptDataRepository: EncryptDataRepository,
        @Inject(QRRepositoryImpl)
        private readonly qrRepository: QRRepository,
        private readonly progenitorService: ProgenitorService,
    ) {}

    async create(createStudentDto: CreateStudentDto) {
        try {

            await this.progenitorService.create(createStudentDto.father);
            await this.progenitorService.create(createStudentDto.mother);

            const student = await this.studentRepository.create(createStudentDto);

            if (createStudentDto.impairments && createStudentDto.impairments.length > 0) {
                const impairmentPromises = createStudentDto.impairments.map(async (id) => {
                    return await firstValueFrom(
                        this.preferencesClient
                            .send(
                                { cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_CREATE }, 
                                {
                                    studentId: student.id,
                                    impairmentId: id
                                }
                            )
                            .pipe(
                                catchError(error => {
                                    throw new RpcException(error);
                                })
                            )
                    );
                });

                await Promise.all(impairmentPromises);
            }

            const studentPreferences = await firstValueFrom(
                this.preferencesClient
                    .send(
                        { cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_BY_STUDENT_WITH_DETAILS },
                        {
                            id: student.id
                        }
                    )
            )

            const payload = {
                studentId: student.id,
                name: student.person.firstName,
                ...studentPreferences
            };

            const token = this.jwtService.sign({...payload});
            const encryptedToken = this.encryptDataRepository.encrypt(token);
            const qrImageBase64 = await this.qrRepository.generateQR(encryptedToken);

            const qrCodeBuffer = base64ToBuffer(qrImageBase64);

            const formData = new FormData();
            const fileName = `${student.id}-qr.png`;
            formData.append('file', qrCodeBuffer, {filename: fileName});
            formData.append('fileName', fileName);
            formData.append('folder', 'qr-images');

            const uploadResponse = await firstValueFrom(
                this.httpService
                    .post('api/cloudinary/upload', formData, {
                        headers: {
                            ...formData.getHeaders(),
                        }
                    })
                    .pipe(
                        catchError((error) => {
                            throw new RpcException(error);
                        }),
                    ),
            );

            const pathImageQr = uploadResponse.data.data.url;
            await this.studentRepository.updateQrPath(student.id, pathImageQr);

            return new RegisterStudentResponseAdapter(pathImageQr, encryptedToken);      
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByTeacher(teacherId: number) {
        try {
            return await this.studentRepository.findByTeacher(teacherId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByCurp(curp: string) {
        try {
            return await this.studentRepository.findByCurp(curp);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByName(name: string) {
        try {
            const [firstName, paternalSurname] = name.split(" ");
            return await this.studentRepository.findByName(firstName, paternalSurname);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}