import { RoadTypeI } from "src/person/domain/entitiesI/RoadTypeI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { PersonI } from "src/person/domain/entitiesI/PersonI";

@Entity('tipo_vialidad')
export class RoadTypeEntity implements RoadTypeI {
    @PrimaryGeneratedColumn('increment', {name: 'id_tipo_vialidad'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 64, nullable: false})
    name: string;
    @OneToMany(() => PersonEntity, person => person.roadType)
    persons: PersonI[];
}