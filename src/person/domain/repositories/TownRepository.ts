import { TownI } from "../entitiesI/TownI";

export interface TownRepository {
    findByMunicipality(municipalityId: number): Promise<TownI[]>;
}