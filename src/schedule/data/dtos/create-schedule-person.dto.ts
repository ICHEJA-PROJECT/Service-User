import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSchedulePersonDto {
    @ApiProperty({description: 'id of relationship between role and person', type: 'number'})
    @IsNumber()
    rolePersonId: number;
    @ApiProperty({description: 'id of schedule', type: 'number'})
    @IsNumber()
    scheduleId: number;
}