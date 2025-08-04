import { MunicipalityI } from "src/person/domain/entitiesI/MunicipalityI";
import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { SettlementTypeI } from "src/person/domain/entitiesI/SettlementTypeI";
import { TownI } from "src/person/domain/entitiesI/TownI";
import { ZipcodeI } from "src/person/domain/entitiesI/ZipcodeI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ZipcodeEntity } from "./zipcode.entity";
import { SettlementTypeEntity } from "./settlement_type.entity";
import { MunicipalityEntity } from "./municipality.entity";
import { TownEntity } from "./town.entity";
import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { PersonEntity } from "./person.entity";

@Entity('asentamiento')
export class SettlementEntity implements SettlementI {
    @PrimaryGeneratedColumn('increment', {name: 'id_asentamiento'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: '128', nullable: false})
    name: string;
    @ManyToOne(() => ZipcodeEntity, zipcode => zipcode.settlements)
    @JoinColumn({name: 'id_codigo_postal'})
    zipcode: ZipcodeI;
    @ManyToOne(() => SettlementTypeEntity, settlementType => settlementType.settlements)
    @JoinColumn({name: 'id_tipo_asentamiento'})
    settlementType: SettlementTypeI;
    @ManyToOne(() => MunicipalityEntity, municipality => municipality.settlements)
    @JoinColumn({name: 'id_municipio'})
    municipality: MunicipalityI;
    @ManyToOne(() => TownEntity, town => town.settlements)
    @JoinColumn({name: 'id_ciudad'})
    town: TownI | null;
    @OneToMany(() => PersonEntity, person => person.settlement)
    persons: PersonI[];
}