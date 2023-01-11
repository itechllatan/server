
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
      business_continuity,
      inherentRisk
    }) {
      this.id_risk_heat_map = id_risk_heat_map;
      this.risk = risk;
      this.heatMap = heatMap;
      this.impactRisk = impactRisk;
      this.frequencyRisk = frequencyRisk;
      this.user = user;
      this.business_continuity = business_continuity;
      this.inherentRisk = inherentRisk;
    }
  }
  
  export default RiskHeatMap;