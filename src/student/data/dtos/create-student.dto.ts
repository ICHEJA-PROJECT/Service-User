import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateProgenitorDto } from "./create-progenitor.dto";
import { Type } from "class-transformer";

export class CreateStudentDto {
    @ApiProperty({description: 'id of person', type: 'number'})
    @IsNumber()
    personId: number;
    @IsOptional()
    @ApiProperty({description: 'id of person', type: 'number'})
    @IsNumber()
    teacherId: number | null;
    @IsOptional()
    @ApiProperty({description: 'path to the qr image', type: 'string'})
    @IsString()
    qrPath: string;
    @ApiProperty({description: 'curp of progenitor to father', type: CreateProgenitorDto})
    @ValidateNested()
    @Type(() => CreateProgenitorDto)
    father: CreateProgenitorDto;
    @ApiProperty({description: 'curp of progenito to mother', type: CreateProgenitorDto})
    @ValidateNested()
    @Type(() => CreateProgenitorDto)
    mother: CreateProgenitorDto;
    @IsOptional()
    @ApiProperty({description: "ids of student's impairments", type: [Number], isArray: true})
    @IsArray()
    @IsNumber({}, {each: true})
    impairments: number[] | null;
}