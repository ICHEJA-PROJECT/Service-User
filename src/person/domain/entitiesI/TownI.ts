import { MunicipalityI } from "./MunicipalityI";
import { SettlementI } from "./SettlementI";

export interface TownI {
    id: number;
    name: string;
    municipality: MunicipalityI;
    settlements: SettlementI[];
}