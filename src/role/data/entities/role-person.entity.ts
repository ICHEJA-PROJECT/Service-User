import { PersonEntity } from "src/person/data/entities/person.entity";
import { PersonI } from "src/person/domain/entitiesI/PersonI";
import { RoleI } from "src/role/domain/entitiesI/RoleI";
import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { SchedulePersonI } from "src/schedule/domain/entities/SchedulePersonI";
import { SchedulePersonEntity } from "src/schedule/data/entities/schedule_person.entity";

@Entity('persona_rol')
export class RolePersonEntity implements RolePersonI {
    @PrimaryGeneratedColumn('increment', { name: 'id_rol_persona'})
    id: number;
    @ManyToOne(() => PersonEntity, person => person.roles)
    @JoinColumn({ name: 'id_persona'})
    person: PersonI;
    @ManyToOne(() => RoleEntity, role => role.people)
    @JoinColumn({ name: 'id_rol'})
    role: RoleI;
    @OneToMany(() => SchedulePersonEntity, schedulePerson => schedulePerson.rolePerson)
    schedules: SchedulePersonI[];
}