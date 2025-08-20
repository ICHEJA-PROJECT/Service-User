import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { SettlementTypeI } from "src/person/domain/entitiesI/SettlementTypeI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SettlementEntity } from "./settlement.entity";

@Entity('tipo_asentamiento')
export class SettlementTypeEntity implements SettlementTypeI {
    @PrimaryGeneratedColumn('increment', {name: 'id_tipo_asentamiento'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 64, nullable: false})
    name: string;
    @OneToMany(() => SettlementEntity, settlement => settlement.settlementType)
    settlements: SettlementI[];
}