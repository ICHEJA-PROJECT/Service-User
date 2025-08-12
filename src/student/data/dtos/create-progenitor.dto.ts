import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProgenitorDto {
    @ApiProperty({name: 'curp', type: 'string'})
    @IsString()
    curp: string;
    @ApiProperty({description: 'first name', type: 'string'})
    @IsString()
    firstName: string;
    @ApiProperty({description: 'middle name', type: 'string'})
    @IsString()
    middleName: string;
    @ApiProperty({description: 'paternal surname', type: 'string'})
    @IsString()
    paternalSurname: string;
    @ApiProperty({description: 'maternal surname', type: 'string'})
    @IsString()
    maternalSurname: string;
}