
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class RiskVariableImpact {
    constructor({
      id_risk_variable_impact,
      variable = requiredParam('variable', language),
      riskHeatMap = requiredParam('riskHeatMap', language),
      impactRisk = requiredParam('impactRisk', language),
    }) {
      this.id_risk_variable_impact = id_risk_variable_impact;
      this.variable = variable;
      this.riskHeatMap = riskHeatMap;
      this.impactRisk = impactRisk;
    }
  }
  
  export default RiskVariableImpact;
