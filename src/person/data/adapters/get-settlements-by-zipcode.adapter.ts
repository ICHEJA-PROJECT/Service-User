import { SettlementI } from "src/person/domain/entitiesI/SettlementI";

export function getSettlementsByZipcodeAdapter(settlements: SettlementI[]) {
  // Usar Map para evitar duplicados y mantener orden
  const statesMap = new Map<number, any>();
  const municipalitiesMap = new Map<number, any>();
  const townsMap = new Map<number, any>();
  
  settlements.forEach(settlement => {
    // Agrupar estados
    if (!statesMap.has(settlement.municipality.state.id)) {
      statesMap.set(settlement.municipality.state.id, {
        id: settlement.municipality.state.id,
        name: settlement.municipality.state.name
      });
    }

    // Agrupar municipios
    if (!municipalitiesMap.has(settlement.municipality.id)) {
      municipalitiesMap.set(settlement.municipality.id, {
        id: settlement.municipality.id,
        name: settlement.municipality.name,
        stateId: settlement.municipality.state.id
      });
    }

    // Agrupar ciudades/pueblos
    if(settlement.town) {
      if (!townsMap.has(settlement.town.id)) {
        townsMap.set(settlement.town.id, {
          id: settlement.town.id,
          name: settlement.town.name
        });
      }
    }
  });

  return {
    states: Array.from(statesMap.values()),
    municipalities: Array.from(municipalitiesMap.values()),
    towns: Array.from(townsMap.values()),
    settlements: settlements.map(s => ({
      id: s.id,
      name: s.name,
      municipalityId: s.municipality.id,
      townId:s.town? s.town.id : null
    }))
  };
}