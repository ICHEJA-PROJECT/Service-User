import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePersonDto {
    @ApiProperty({description: "student's firstname", type: 'string', default: 'Fernando'})
    @IsString()
    firstName: string;
    @ApiProperty({description: "student's middlename", type: 'string', default: 'Emiliano'})
    @IsString()
    middleName: string;
    @ApiProperty({ description: "student's paternal surname", type: 'string', default: 'Flores'})
    @IsString()
    paternalSurname: string;
    @ApiProperty({ description: "student's maternal surname", type: 'string', default: 'De la Riva'})
    @IsString()
    maternalSurname: string;
    @ApiProperty({ description: "student's curp", type: 'string', default: 'FORF040807HCSLVRA8'})
    @IsString()
    curp: string;
    @ApiProperty({ description: "student's ine number", type: 'string', default: '2364956377'})
    @IsString()
    ineNumber: string;
    @ApiProperty({ description: "student's birthdate", type: 'string', default: '2004-08-07'})
    @IsString()
    birthdate: string;
    @ApiProperty({ description: "student's gender", type: 'string', default: 'M'})
    @IsString()
    gender: string;
    @ApiProperty({ description: "student's road name", type: 'string', default: 'Versalles'})
    @IsString()
    roadName: string;
    @ApiProperty({ description: "road type id of student's road", type: 'number', default: 1 })
    @IsNumber()
    roadTypeId: number;
    @ApiProperty({ description: "id of student's settlement", type: 'number', default: 416})
    @IsNumber()
    settlementId: number;
    @ApiProperty({ description: "student's password", type: 'string', default: '12345678'})
    @IsString()
    password: string;
    @ApiProperty({ description: "base64 to the media (img)", type: 'string'})
    @IsString()
    profileImagePath: string;
}