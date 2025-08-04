import { RoadTypeI } from "../entitiesI/RoadTypeI";

export interface RoadTypeRepository {
    findAll(): Promise<RoadTypeI[]>;
}