
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
      inherentRisk,
      percentage_inherent_risk_frequency,
      percentage_inherent_risk_impact,
      percentage_residual_risk_frequency,
      percentage_residual_risk_impact,
      residualRisk
    }) {
      this.id_risk_heat_map = id_risk_heat_map;
      this.risk = risk;
      this.heatMap = heatMap;
      this.impactRisk = impactRisk;
      this.frequencyRisk = frequencyRisk;
      this.user = user;
      this.business_continuity = business_continuity;
      this.inherentRisk = inherentRisk;
      this.percentage_inherent_risk_frequency = percentage_inherent_risk_frequency;
      this.percentage_inherent_risk_impact = percentage_inherent_risk_impact;
      this.percentage_residual_risk_frequency = percentage_residual_risk_frequency;
      this.percentage_residual_risk_impact = percentage_residual_risk_impact;
      this.residualRisk = residualRisk;
    }
  }
  
  export default RiskHeatMap;