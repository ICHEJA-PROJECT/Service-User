import { CreateInstitutionDto } from "src/cell/data/dtos/create-institution.dto";
import { InstitutionI } from "../entitiesI/InstitutionI";

export interface InstitutionRepository {
    create(createInstitutionDto: CreateInstitutionDto): Promise<InstitutionI>;
    findAll(): Promise<InstitutionI[]>;
    findOne(id: number): Promise<InstitutionI>;
}