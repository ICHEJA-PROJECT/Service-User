import { MunicipalityI } from "./MunicipalityI";

export interface StateI {
    id: number;
    name: string;
    municipalities: MunicipalityI[];
}