
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class RiskHeatMap {
    constructor({
      id_risk_heat_map,
      risk,
      heatMap,
      impactRisk,
      frequencyRisk,
      user,
    }) {
      this.id_risk_heat_map = id_risk_heat_map;
      this.risk = risk;
      this.heatMap = heatMap;
      this.impactRisk = impactRisk;
      this.frequencyRisk = frequencyRisk;
      this.user = user;
    }
  }
  
  export default RiskHeatMap;