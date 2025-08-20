import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateInstitutionDto {
    @ApiProperty({description: 'rfc of institution', type: 'string', maxLength: 15})
    @IsString()
    rfc: string;
    @ApiProperty({description: 'rct of institution', type: 'string', maxLength: 20})
    @IsString()
    rct: string;
    @ApiProperty({description: 'name of institution', type: 'string'})
    @IsString()
    name: string;
}