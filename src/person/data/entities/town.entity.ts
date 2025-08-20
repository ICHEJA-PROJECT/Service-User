import { MunicipalityI } from "src/person/domain/entitiesI/MunicipalityI";
import { TownI } from "src/person/domain/entitiesI/TownI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MunicipalityEntity } from "./municipality.entity";
import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { SettlementEntity } from "./settlement.entity";

@Entity('ciudad')
export class TownEntity implements TownI {
    @PrimaryGeneratedColumn('increment', {name: 'id_ciudad'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 128, nullable: false})
    name: string;
    @ManyToOne(() => MunicipalityEntity, municipality => municipality.towns)
    @JoinColumn({name: 'id_municipio'})
    municipality: MunicipalityI;
    @OneToMany(() => SettlementEntity, settlement => settlement.town)
    settlements: SettlementI[];
}