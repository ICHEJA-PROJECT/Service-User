import { ProgenitorI } from "src/student/domain/entitiesI/ProgenitorI";
import { StudentI } from "src/student/domain/entitiesI/StudentI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity('progenitor')
export class ProgenitorEntity implements ProgenitorI {
    @PrimaryGeneratedColumn('increment', {name: 'id_progenitor'})
    id: number;
    @Column({name: 'curp', type: 'varchar', length: 18, nullable: false})
    curp: string;
    @Column({name: 'primer_nombre', type: 'varchar', length: 32, nullable: false})
    firstName: string;
    @Column({name: 'segundo_nombre', type: 'varchar', length: 32, nullable: false})
    middleName: string;
    @Column({name: 'primer_apellido', type: 'varchar', length: 32, nullable: false})
    paternalSurname: string;
    @Column({name: 'segundo_apellido', type: 'varchar', length: 32, nullable: false})
    maternalSurname: string;
    @OneToMany(() => StudentEntity, student => student.person)
    students: StudentI[];
}