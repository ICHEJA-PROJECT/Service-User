import { CreateProgenitorDto } from "src/student/data/dtos/create-progenitor.dto";
import { ProgenitorI } from "../entitiesI/ProgenitorI";

export interface ProgenitorRepository {
    create(createProgenitorDto: CreateProgenitorDto): Promise<ProgenitorI>;
    findByCurp(curp: string): Promise<ProgenitorI | null>;
}