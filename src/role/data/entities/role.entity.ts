import { RoleI } from "src/role/domain/entitiesI/RoleI";
import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePersonEntity } from "./role-person.entity";

@Entity('rol')
export class RoleEntity implements RoleI {
    @PrimaryGeneratedColumn('increment', {name: 'id_rol'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 64, nullable: false})
    name: string;
    @OneToMany(() => RolePersonEntity, rolePerson => rolePerson.role)
    people: RolePersonI[];
}