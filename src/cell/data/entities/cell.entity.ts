import { CellI } from "src/cell/domain/entitiesI/CellI";
import { InstitutionI } from "src/cell/domain/entitiesI/InstitutionI";
import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InstitutionEntity } from "./institution.entity";
import { PersonEntity } from "src/person/data/entities/person.entity";
import { TeacherCellI } from "src/cell/domain/entitiesI/TeacherCellI";
import { TeacherCellEntity } from "./teacher_cell.entity";

@Entity('celula')
export class CellEntity implements CellI {
    @PrimaryGeneratedColumn('increment', {name: 'id_celula'})
    id: number;
    @ManyToOne(() => InstitutionEntity, institution => institution.cells)
    @JoinColumn({name: 'id_institucion'})
    institution: InstitutionI;
    @ManyToOne(() => PersonEntity, person => person.cells)
    @JoinColumn({name: 'id_persona'})
    coordinator: PersonI;
    @Column({name: 'fecha_inicio', type: 'timestamp without time zone', nullable: false})
    startDate: Date;
    @Column({name: 'fecha_final', type: 'timestamp without time zone', nullable: false})
    endDate: Date;
    @OneToMany(() => TeacherCellEntity, teacherCell => teacherCell.cell)
    teachers: TeacherCellI[];
}