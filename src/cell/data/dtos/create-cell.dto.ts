import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CreateCellDto {
    @ApiProperty({description: 'id of institution', type: 'number'})
    @IsNumber()
    institutionId: number;
    @ApiProperty({description: 'id of person who is the coordinator of cell', type: 'number'})
    @IsNumber()
    coordinatorId: number;
    @ApiProperty({description: 'start date of cell', type: 'string'})
    @IsDateString()
    startDate: string;
    @ApiProperty({description: 'end date of cell', type: 'string'})
    @IsDateString()
    endDate: string;
}