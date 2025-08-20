import { SettlementI } from "./SettlementI";

export interface SettlementTypeI {
    id: number;
    name: string;
    settlements: SettlementI[];
} 