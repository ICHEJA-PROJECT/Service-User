import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTeacherCellDto {
    @ApiProperty({description: 'id of person who is the teacher', type: 'number'})
    @IsNumber()
    teacherId: number;
    @ApiProperty({description: 'if of cell', type: 'number'})
    @IsNumber()
    cellId: number;
}