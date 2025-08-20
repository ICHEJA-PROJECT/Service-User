import { CreateCellDto } from "src/cell/data/dtos/create-cell.dto";
import { CellI } from "../entitiesI/CellI";

export interface CellRepository {
    create(creteCellDto: CreateCellDto): Promise<CellI>;
    findAll(): Promise<CellI[]>;
    findByInstitution(institutionId: number): Promise<CellI[]>;
    findByCoordinator(coordinatorId: number): Promise<CellI[]>;
    findOne(id: number): Promise<CellI>;
}