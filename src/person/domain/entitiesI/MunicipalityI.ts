import { SettlementI } from "./SettlementI";
import { StateI } from "./StateI";
import { TownI } from "./TownI";

export interface MunicipalityI {
    id: number;
    name: string;
    state: StateI;
    towns: TownI[];
    settlements: SettlementI[];
}