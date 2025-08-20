import { CellI } from "src/cell/domain/entitiesI/CellI";
import { InstitutionI } from "src/cell/domain/entitiesI/InstitutionI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CellEntity } from "./cell.entity";

@Entity('institucion')
export class InstitutionEntity implements InstitutionI {
    @PrimaryGeneratedColumn('increment', {name: 'id_institucion'})
    id: number;
    @Column({name: 'rfc', type: 'varchar', length: 15, nullable: false})
    rfc: string;
    @Column({name: 'rct', type: 'varchar', length: 20, nullable: false})
    rct: string;
    @Column({name: 'nombre', type: 'varchar', length: 64, nullable: false})
    name: string;
    @OneToMany(() => CellEntity, cell => cell.institution)
    cells: CellI[];
}