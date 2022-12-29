import CommonRepository from './common';
import RiskSchema from '../schemas/risk';
import { getRepository, getConnection } from 'typeorm';

class RiskRepository extends CommonRepository {
  constructor() {
    super(RiskSchema);
    this.conn = getRepository(RiskSchema)
  }

  async getRiskById(id) {
    let builder = getConnection()
      .createQueryBuilder()
      .select([
        'risk',
        'user',
        'risk_heatMap',
        'heatMap',
        'matrix',
        'matrixFrequency',
        'matrixImpact',
        'matrixRiskLevel',
        'impactRisk',
        'frequencyRisk',
        'riskVariableFrequency',
        'variableFrequency',
        'frequencyRiskVariable',
        'variableFrequencyType',
        'riskVariableImpact',
        'variableImpact',
        'impactRiskVariable',
        'variableImpactType'
      ])
      .from('risk', 'risk')
      .leftJoin('risk.user', 'user')
      .leftJoin('risk.risk_heatMap', 'risk_heatMap')
      .leftJoin('risk_heatMap.heatMap', 'heatMap')
      .leftJoin('heatMap.matrix', 'matrix')
      .leftJoin('matrix.frequencyRisk', 'matrixFrequency')
      .leftJoin('matrix.impactRisk', 'matrixImpact')
      .leftJoin('matrix.riskLevel', 'matrixRiskLevel')
      .leftJoin('risk_heatMap.impactRisk', 'impactRisk')
      .leftJoin('risk_heatMap.frequencyRisk', 'frequencyRisk')
      .leftJoin('risk_heatMap.risk_variable_frequency', 'riskVariableFrequency')
      .leftJoin('riskVariableFrequency.variable', 'variableFrequency')
      .leftJoin('riskVariableFrequency.frequencyRisk','frequencyRiskVariable')
      .leftJoin('variableFrequency.variable_type', 'variableFrequencyType')
      .leftJoin('risk_heatMap.risk_variable_impact', 'riskVariableImpact')
      .leftJoin('riskVariableImpact.variable', 'variableImpact')
      .leftJoin('riskVariableImpact.impactRisk','impactRiskVariable')
      .leftJoin('variableImpact.variable_type', 'variableImpactType')
      .where('risk.id_risk = :id',
        {id}
      )
      .addOrderBy('matrixFrequency.id_frequency_risk', 'DESC')
      .addOrderBy('matrixImpact.id_impact_risk','ASC')
      .cache(true);

    return await builder.getOne();
  }
}

export default RiskRepository;
