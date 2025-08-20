import { RolePersonEntity } from "src/role/data/entities/role-person.entity";
import { RolePersonI } from "src/role/domain/entitiesI/RolePersonI";
import { ScheduleI } from "src/schedule/domain/entities/ScheduleI";
import { SchedulePersonI } from "src/schedule/domain/entities/SchedulePersonI";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ScheduleEntity } from "./schedule.entity";

@Entity('personal_horarios')
export class SchedulePersonEntity implements SchedulePersonI {
    @PrimaryColumn({name: 'id_persona_rol', type: 'int', nullable: false})
    rolePersonId: number;
    @PrimaryColumn({name: 'id_horario_disponible', type: 'int', nullable: false})
    scheduleId: number;
    @ManyToOne(() => RolePersonEntity, rolePerson => rolePerson.schedules)
    @JoinColumn({name: 'id_persona_rol'})
    rolePerson: RolePersonI;
    @ManyToOne(() => ScheduleEntity, schedule => schedule.schedulePeople)
    @JoinColumn({name: 'id_horario_disponible'})
    schedule: ScheduleI;
}