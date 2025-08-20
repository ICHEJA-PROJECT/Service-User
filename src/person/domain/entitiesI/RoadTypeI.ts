import { PersonI } from "./PersonI";

export interface RoadTypeI {
    id: number;
    name: string;
    persons: PersonI[];
}