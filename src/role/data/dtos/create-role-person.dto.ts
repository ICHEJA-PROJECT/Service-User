import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateRolePersonDto {
    @ApiProperty({description: 'person Id', type: 'number'})
    @IsNumber()
    personId: number;
    @ApiProperty({description: 'role Id', type: 'number'})
    @IsNumber()
    roleId: number;
}