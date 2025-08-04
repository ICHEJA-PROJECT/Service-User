import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PersonRepositoryImpl } from "../data/repositories/person.repository.impl";
import { PersonRepository } from "../domain/repositories/PersonRepository";
import { CreatePersonDto } from "../data/dtos/create-person.dto";
import { RpcException } from "@nestjs/microservices";
import * as FormData from 'form-data';
import * as moment from 'moment';
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { MIME_TYPES } from "src/shared/constants/mime_types";
import { HashDataRepositoryImpl } from "../data/repositories/hash_data.repository.impl";
import { HashDataRepository } from "../domain/repositories/HashDataRepository";
import { base64ToMulterFile } from "src/shared/utils/base64ToMulterFile";

@Injectable()
export class PersonService {
    constructor(
        @Inject(PersonRepositoryImpl) 
        private readonly personRepository: PersonRepository,
        private readonly httpService: HttpService,
        @Inject(HashDataRepositoryImpl)
        private readonly hashDataRepository: HashDataRepository,
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        try {

            console.log(createPersonDto);

            const formData = new FormData();
            const fileName = `${createPersonDto.curp}-${moment().format('YYYY-MM-DD-HH-mm-ss')}`;


            const profilePersonImage = base64ToMulterFile(createPersonDto.profileImagePath, fileName, MIME_TYPES.IMAGES[1]);

            console.log(profilePersonImage);

            formData.append(
                'file',
                profilePersonImage.buffer,
                {
                    filename: profilePersonImage.originalname,
                    contentType: profilePersonImage.mimetype,
                },
            );
            formData.append('fileName', fileName);
            formData.append('folder', 'profiles-images');

            const uploadImageRes = await firstValueFrom(
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

            const pathImage = uploadImageRes.data.data.url;

            const hashPassword = this.hashDataRepository.hash(createPersonDto.password);

            const person = await this.personRepository.create({
                ...createPersonDto,
                profileImagePath: pathImage,
                password: hashPassword,
            });

            return person;
        } catch (error) {

            console.log(error);

            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number) {
        try {
            return await this.personRepository.findOne(id);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}