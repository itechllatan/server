
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class RiskVariableFrequency {
    constructor({
      id_risk_variable_frequency,
      variable = requiredParam('variable', language),
      riskHeatMap = requiredParam('riskHeatMap', language),
      frequencyRisk = requiredParam('frequencyRisk', language),
    }) {
      this.id_risk_variable_frequency = id_risk_variable_frequency;
      this.variable = variable;
      this.riskHeatMap = riskHeatMap;
      this.frequencyRisk = frequencyRisk;
    }
  }
  
  export default RiskVariableFrequency;
