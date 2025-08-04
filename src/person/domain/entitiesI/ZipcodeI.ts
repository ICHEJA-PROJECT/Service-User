import { SettlementI } from "./SettlementI";

export interface ZipcodeI {
    id: number;
    code: string;
    settlements: SettlementI[];
}