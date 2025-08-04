import { MunicipalityI } from "src/person/domain/entitiesI/MunicipalityI";
import { StateI } from "src/person/domain/entitiesI/StateI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MunicipalityEntity } from "./municipality.entity";

@Entity('estado')
export class StateEntity implements StateI {
    @PrimaryGeneratedColumn('increment', {name: 'id_estado'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 64, nullable: false})
    name: string;
    @OneToMany(() => MunicipalityEntity, municipality => municipality.state)
    municipalities: MunicipalityI[];
}