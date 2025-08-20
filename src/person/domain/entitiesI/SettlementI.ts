import { MunicipalityI } from "./MunicipalityI";
import { PersonI } from "./PersonI";
import { SettlementTypeI } from "./SettlementTypeI";
import { TownI } from "./TownI";
import { ZipcodeI } from "./ZipcodeI";

export interface SettlementI {
    id: number;
    name: string;
    zipcode: ZipcodeI;
    settlementType: SettlementTypeI;
    municipality: MunicipalityI;
    town: TownI | null;
    persons: PersonI[];
}