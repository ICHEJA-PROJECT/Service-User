import { PersonI } from "../entitiesI/PersonI";
import { CreatePersonDto } from "src/person/data/dtos/create-person.dto";

export interface PersonRepository {
    create(createPersonDto: CreatePersonDto): Promise<PersonI>;
    findOne(id: number): Promise<PersonI>;
}