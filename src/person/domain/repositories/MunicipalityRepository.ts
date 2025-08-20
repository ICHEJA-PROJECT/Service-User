import { MunicipalityI } from "../entitiesI/MunicipalityI";

export interface MunicipalityRepository {
    findByState(stateId: number): Promise<MunicipalityI[]>;
}