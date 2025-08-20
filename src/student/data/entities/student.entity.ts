import { PersonEntity } from "src/person/data/entities/person.entity";
import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { ProgenitorI } from "src/student/domain/entitiesI/ProgenitorI";
import { StudentI } from "src/student/domain/entitiesI/StudentI";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProgenitorEntity } from "./progenitor.entity";

@Entity('educando')
export class StudentEntity implements StudentI {
    @PrimaryGeneratedColumn('increment', {name: 'id_educando'})
    id: number;
    @OneToOne(() => PersonEntity, person => person.student)
    @JoinColumn({name: 'id_persona'})
    person: PersonI;
    @ManyToOne(() => PersonEntity, { eager: true, nullable: true})
    @JoinColumn({ name: 'id_educador'})
    teacher: PersonI | null;
    @Column({ name: 'qr_ruta', type: 'varchar', length: 200, nullable: false})
    qrPath: string;
    @ManyToOne(() => ProgenitorEntity, progenitor => progenitor.students)
    @JoinColumn({name: 'id_padre'})
    father: ProgenitorI;
    @ManyToOne(() => ProgenitorEntity, progenitor => progenitor.students)
    @JoinColumn({name: 'id_madre'})
    mother: ProgenitorI;
}