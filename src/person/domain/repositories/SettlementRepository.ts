import { SettlementI } from "../entitiesI/SettlementI";

export interface SettlementRepository {
    findAll(): Promise<SettlementI[]>;
    findByZipcode(zipcode: string): Promise<SettlementI[]>;
    findByMunicipality(municipalityId: number): Promise<SettlementI[]>;
    findByMunicipalityAndTown(municipalityId: number, townId: number): Promise<SettlementI[]>;
}