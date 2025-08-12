import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/domain/repositories/StudentRepository";
import { StudentEntity } from "../entities/student.entity";
import { Like, Repository } from "typeorm";
import { ProgenitorEntity } from "../entities/progenitor.entity";
import { StudentI } from "src/student/domain/entitiesI/StudentI";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { RpcException } from "@nestjs/microservices";
import { PersonEntity } from "src/person/data/entities/person.entity";
import { PersonI } from "src/person/domain/entitiesI/PersonI";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(ProgenitorEntity)
        private readonly progenitorRepository: Repository<ProgenitorEntity>,
        @InjectRepository(PersonEntity)
        private readonly personRepository: Repository<PersonEntity>
    ) {}

    async create(createStudentDto: CreateStudentDto): Promise<StudentI> {
        try {
            const studenPerson = await this.personRepository.findOne({where: {id: createStudentDto.personId}});
            if(!studenPerson) throw new RpcException({
                message: "La persona seleccionada como educando no existe.",
                status: HttpStatus.BAD_REQUEST,
            });

            let teacherPerson: PersonI | null = null;
            if(createStudentDto.teacherId) {
                teacherPerson = await this.personRepository.findOne({where: { id: createStudentDto.teacherId}})
                if(!teacherPerson) throw new RpcException({
                    message: "La persona seleccionada como educador no existe.",
                    status: HttpStatus.BAD_REQUEST,
                });
            }

            const father = await this.progenitorRepository.findOne({where: {curp: createStudentDto.father.curp}});
            if(!father) throw new RpcException({
                message: "La persona seleccionada como padre no existe.",
                status: HttpStatus.BAD_REQUEST,
            });

            const mother = await this.progenitorRepository.findOne({where: {curp: createStudentDto.mother.curp}});
            if(!mother) throw new RpcException({
                message: "La persona seleccionada como madre no existe.",
                status: HttpStatus.BAD_REQUEST,
            });

            const student = this.studentRepository.create({
                ...createStudentDto,
                person: studenPerson,
                teacher: teacherPerson,
                father: father, 
                mother: mother,
                qrPath: 'pending'
            });

            const studentSaved = await this.studentRepository.save(student);

            return studentSaved;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByTeacher(teacherId: number): Promise<StudentI[]> {
        try {
            return await this.studentRepository.find({where: {teacher: {id: teacherId}}});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async updateQrPath(studentId: number, pathImageQr: string) {
        try {
            await this.studentRepository.update(studentId, { qrPath: pathImageQr});
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByCurp(curp: string): Promise<StudentI[]> {
        try {
            const students = await this.studentRepository.find({where: { person: {curp: Like(`%${curp}%`)}}});

            return students;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByName(firstName: string, paternalSurname: string) {
        try {
            
            const students = await this.studentRepository.find({
                where: { 
                    person: {
                        firstName: Like(`%${firstName}%`),
                        paternalSurname: Like(`%${paternalSurname}%`)
                    }
                }
            });

            return students;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}