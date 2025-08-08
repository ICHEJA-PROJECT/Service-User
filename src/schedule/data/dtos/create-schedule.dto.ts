import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { DAY_OF_WEEK } from "src/shared/constants/day_of_week";

export class CreateScheduleDto {
    @ApiProperty({description: 'name of day of week', type: 'string', enum: DAY_OF_WEEK, example: DAY_OF_WEEK.LUNES})
    @IsString()
    day: string;
    @ApiProperty({description: 'hour', type: 'string'})
    @IsString()
    hour: string;
}