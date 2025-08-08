import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { RoadTypeI } from "src/person/domain/entitiesI/RoadTypeI";
import { SettlementI } from "src/person/domain/entitiesI/SettlementI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoadTypeEntity } from "./road_type.entity";
import { SettlementEntity } from "./settlement.entity";
import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { RolePersonEntity } from "src/role/data/entities/role-person.entity";

@Entity('persona')
export class PersonEntity implements PersonI {
    @PrimaryGeneratedColumn('increment', {name: 'id_persona'})
    id: number;
    @Column({name: 'primer_nombre', type: 'varchar', length: 32, nullable: false})
    firstName: string;
    @Column({name: 'segundo_nombre', type: 'varchar', length: 32, nullable: false})
    middleName: string;
    @Column({name: 'apellido_paterno', type: 'varchar', length: 32, nullable: false})
    paternalSurname: string;
    @Column({name: 'apellido_materno', type: 'varchar', length: 32, nullable: false})
    maternalSurname: string;
    @Column({name: 'curp', type: 'varchar', length: 20, nullable: false})
    curp: string;
    @Column({name: 'numero_ine', type: 'varchar', length: 15, nullable: false})
    ineNumber: string;
    @Column({name: 'fecha_nacimiento', type: 'date', nullable: false})
    birthdate: Date;
    @Column({name: 'genero', type: 'varchar', length: 1,  nullable: false})
    gender: string;
    @Column({name: 'vialidad_nombre', type: 'varchar', length: 100, nullable: false})
    roadName: string;
    @ManyToOne(() => RoadTypeEntity, roadType => roadType.persons)
    @JoinColumn({name: 'id_tipo_vialidad'})
    roadType: RoadTypeI;
    @ManyToOne(() => SettlementEntity, settlement => settlement.persons)
    @JoinColumn({name: 'id_asentamiento'})
    settlement: SettlementI;
    @Column({name: 'contrasenia', type: 'varchar', length: 254, nullable: false})
    password: string;
    @Column({name: 'ruta_imagen_perfil', type: 'varchar', length: 254, nullable: false})
    profileImagePath: string;
    @OneToMany(() => RolePersonEntity, rolePerson => rolePerson.person)
    roles: RolePersonI[];
}