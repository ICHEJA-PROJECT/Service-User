import { ScheduleI } from "src/schedule/domain/entities/ScheduleI";
import { SchedulePersonI } from "src/schedule/domain/entities/SchedulePersonI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchedulePersonEntity } from "./schedule_person.entity";

@Entity('horarios_disponibles')
export class ScheduleEntity implements ScheduleI {
    @PrimaryGeneratedColumn('increment', {name: 'id_horarios_disponibles'})
    id: number;
    @Column({name: 'dia', type: 'varchar', nullable: false})
    day: string;
    @Column({name: 'hour', type: 'time without time zone', nullable: false})
    hour: string;
    @OneToMany(() => SchedulePersonEntity, schedulePerson => schedulePerson.schedule)
    schedulePeople: SchedulePersonI[];
}