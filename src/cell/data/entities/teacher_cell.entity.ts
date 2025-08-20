import { CellI } from "src/cell/domain/entitiesI/CellI";
import { TeacherCellI } from "src/cell/domain/entitiesI/TeacherCellI";
import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CellEntity } from "./cell.entity";
import { PersonEntity } from "src/person/data/entities/person.entity";

@Entity('celula_educador')
export class TeacherCellEntity implements TeacherCellI {
    @PrimaryColumn({name: 'id_persona', type: 'number', nullable: false})
    teacherId: number;
    @PrimaryColumn({name: 'id_celula', type: 'number', nullable: false})
    cellId: number;
    @ManyToOne(() => PersonEntity, person => person.cells)
    @JoinColumn({name: 'id_persona'})
    teacher: PersonI;
    @ManyToOne(() => CellEntity, cell => cell.teachers)
    @JoinColumn({name: 'id_celula'})
    cell: CellI;
}