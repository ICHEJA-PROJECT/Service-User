import { CellI } from "./CellI";

export interface InstitutionI {
    id: number;
    rfc: string;
    rct: string;
    name: string;
    cells: CellI[];
}