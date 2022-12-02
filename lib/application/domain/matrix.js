import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

class Matrix {
    constructor({ 
        id_matrix, 
        frequencyRisk = requiredParam('frequencyRisk', language), 
        impactRisk = requiredParam('impactRisk', language), 
        riskLevel = requiredParam('riskLevel', language), 
        heatMap = requiredParam('heatMap', language), 
        language}){
        this.id_matrix = id_matrix;
        this.frequencyRisk = frequencyRisk;
        this.impactRisk = impactRisk;
        this.riskLevel = riskLevel;
        this.heatMap = heatMap;
    }
}

export default Matrix;