import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { ZipcodeI } from "src/person/domain/entitiesI/ZipcodeI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SettlementEntity } from "./settlement.entity";

@Entity('codigo_postal')
export class ZipcodeEntity implements ZipcodeI {
    @PrimaryGeneratedColumn('increment', {name: 'id_codigo_postal'})
    id: number;
    @Column({name: 'codigo', type: 'varchar', length: 5, nullable: false})
    code: string;
    @OneToMany(() => SettlementEntity, settlement => settlement.zipcode)
    settlements: SettlementI[];
}