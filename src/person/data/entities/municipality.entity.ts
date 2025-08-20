import { MunicipalityI } from "src/person/domain/entitiesI/MunicipalityI";
import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { StateI } from "src/person/domain/entitiesI/StateI";
import { TownI } from "src/person/domain/entitiesI/TownI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SettlementEntity } from "./settlement.entity";
import { TownEntity } from "./town.entity";
import { StateEntity } from "./state.entity";

@Entity('municipio')
export class MunicipalityEntity implements MunicipalityI {
    @PrimaryGeneratedColumn('increment', {name: 'id_municipio'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 128, nullable: false})
    name: string;
    @ManyToOne(() => StateEntity, state => state.municipalities)
    @JoinColumn({name: 'id_estado'})
    state: StateI;
    @OneToMany(() => TownEntity, town => town.municipality)
    towns: TownI[];
    @OneToMany(() => SettlementEntity, settlement => settlement.municipality)
    settlements: SettlementI[];
}