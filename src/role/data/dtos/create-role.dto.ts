import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({description: 'name of role', type: 'string'})
    @IsString()
    name: string;
}