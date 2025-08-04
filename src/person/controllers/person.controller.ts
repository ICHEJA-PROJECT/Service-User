import { Controller, Inject } from "@nestjs/common";
import { PersonService } from "../services/person.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";
import { CreatePersonDto } from "../data/dtos/create-person.dto";

@Controller('persons')
export class PersonController {
    constructor(
        private readonly personService: PersonService,
    ) {}

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.PERSON_CREATE })
    async create(@Payload() createPersonDto: CreatePersonDto) {
        return await this.personService.create(createPersonDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.PERSON_FIND_ONE })
    async findOne(@Payload() id: number) {
        console.log(id);
        return await this.personService.findOne(id);
    }

}