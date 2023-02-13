import CommonRepository from './common';
import RiskSchema from '../schemas/risk';
import { getRepository, getConnection } from 'typeorm';

class RiskRepository extends CommonRepository {
  constructor() {
    super(RiskSchema);
    this.conn = getRepository(RiskSchema)
  }
  async getAllRisks_0(query){
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'risk',
        'risk_heatMap',
        'user',
        'control_risk',
        'controls',
        'inherentRisk',
        'riskLevelInherent',
        'frequencyRiskInherent',
        'impactRiskInherent',
        'residualRisk',
        'riskLevelResidual',
        'frequencyRiskResidual',
        'impactRiskResidual'
      ])
      .from('risk', 'risk')
      .leftJoin('risk.risk_heatMap', 'risk_heatMap')
      .leftJoin('risk_heatMap.heatMap', 'heatMap')
      .leftJoin('risk_heatMap.control_risk', 'control_risk')
      .leftJoin('control_risk.controls', 'controls')
      .leftJoin('risk_heatMap.inherentRisk', 'inherentRisk')
      .leftJoin('inherentRisk.riskLevel', 'riskLevelInherent')
      .leftJoin('inherentRisk.frequencyRisk', 'frequencyRiskInherent')
      .leftJoin('inherentRisk.impactRisk', 'impactRiskInherent')
      .leftJoin('risk_heatMap.residualRisk', 'residualRisk')
      .leftJoin('residualRisk.riskLevel', 'riskLevelResidual')
      .leftJoin('residualRisk.frequencyRisk', 'frequencyRiskResidual')
      .leftJoin('residualRisk.impactRisk', 'impactRiskResidual')
      .leftJoin('risk_heatMap.user','user')
      .where('risk_heatMap.deleted_at is null')
      .andWhere('(lower(risk.name) like lower(:name) OR lower(risk.description) like lower(:name) OR lower(risk.reference) like lower(:name))', { name: `%${query.search}%`})
      .skip((page-1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
     
     builder[0].forEach(risk => {
      const inRiskImpact = risk?.risk_heatMap?.[0]?.percentage_inherent_risk_impact;
      const inRiskFrequency = risk?.risk_heatMap?.[0]?.percentage_inherent_risk_frequency;
      const reRiskImpact = risk?.risk_heatMap?.[0]?.percentage_residual_risk_impact;
      const reRiskFrequency = risk?.risk_heatMap?.[0]?.percentage_residual_risk_frequency;
      risk.inherentRiskTotal = inRiskImpact && inRiskFrequency ? inRiskFrequency * inRiskImpact / 100 : 0;
      risk.residualRiskTotal = reRiskImpact && reRiskFrequency ? reRiskImpact * reRiskFrequency / 100 : 0;
      risk.user = risk?.risk_heatMap?.[0]?.user;
     })
     
     builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / pageSize) + 1
     }
     return builder
  }

  async getAllRisks(query){
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'risk',
        'risk_heatMap',
        'user',
        'control_risk',
        'controls',
        'inherentRisk',
        'riskLevelInherent',
        'frequencyRiskInherent',
        'impactRiskInherent',
        'residualRisk',
        'riskLevelResidual',
        'frequencyRiskResidual',
        'impactRiskResidual',


        'plans_action_risk', 'plansAction',
        'subprocessRisk', 'subprocess',
        'macroprocessRisk', 'macroprocess',
        'processRisk', 'process',

      ])
      .from('risk', 'risk')
      .leftJoin('risk.risk_heatMap', 'risk_heatMap')
      .leftJoin('risk_heatMap.heatMap', 'heatMap')
      .leftJoin('risk_heatMap.control_risk', 'control_risk')
      .leftJoin('control_risk.controls', 'controls')
      .leftJoin('risk_heatMap.inherentRisk', 'inherentRisk')
      .leftJoin('inherentRisk.riskLevel', 'riskLevelInherent')
      .leftJoin('inherentRisk.frequencyRisk', 'frequencyRiskInherent')
      .leftJoin('inherentRisk.impactRisk', 'impactRiskInherent')
      .leftJoin('risk_heatMap.residualRisk', 'residualRisk')
      .leftJoin('residualRisk.riskLevel', 'riskLevelResidual')
      .leftJoin('residualRisk.frequencyRisk', 'frequencyRiskResidual')
      .leftJoin('residualRisk.impactRisk', 'impactRiskResidual')
      .leftJoin('risk_heatMap.user','user')


      .leftJoin('risk_heatMap.plans_action_risk', 'plans_action_risk')
      .leftJoin('plans_action_risk.plansAction', 'plansAction')
      .leftJoin('risk_heatMap.subprocessRisk', 'subprocessRisk')
      .leftJoin('subprocessRisk.subprocess', 'subprocess')
      .leftJoin('risk_heatMap.macroprocessRisk', 'macroprocessRisk')
      .leftJoin('macroprocessRisk.macroprocess', 'macroprocess')
      .leftJoin('risk_heatMap.processRisk', 'processRisk')
      .leftJoin('processRisk.process', 'process')


      .where('risk_heatMap.deleted_at is null')
      .andWhere('(lower(risk.name) like lower(:name) OR lower(risk.description) like lower(:name) OR lower(risk.reference) like lower(:name))', { name: `%${query.search}%`})
      .skip((page-1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
     
     builder[0].forEach(risk => {
      const inRiskImpact = risk?.risk_heatMap?.[0]?.percentage_inherent_risk_impact;
      const inRiskFrequency = risk?.risk_heatMap?.[0]?.percentage_inherent_risk_frequency;
      const reRiskImpact = risk?.risk_heatMap?.[0]?.percentage_residual_risk_impact;
      const reRiskFrequency = risk?.risk_heatMap?.[0]?.percentage_residual_risk_frequency;
      risk.inherentRiskTotal = inRiskImpact && inRiskFrequency ? inRiskFrequency * inRiskImpact / 100 : 0;
      risk.residualRiskTotal = reRiskImpact && reRiskFrequency ? reRiskImpact * reRiskFrequency / 100 : 0;
      risk.user = risk?.risk_heatMap?.[0]?.user;
     })
     
     builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / pageSize) + 1
     }
     return builder
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
        'inherentRisk',
        'inherentRiskFrequency',
        'inherentRiskImpact',
        'inherentRiskLevel',
        'residualRisk',
        'residualRiskFrequency',
        'residualRiskImpact',
        'residualRiskLevel',
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
      .leftJoin('risk_heatMap.risk_variable_impact', 'riskVariableImpact')
      .leftJoin('risk_heatMap.inherentRisk', 'inherentRisk')
      .leftJoin('inherentRisk.frequencyRisk', 'inherentRiskFrequency')
      .leftJoin('inherentRisk.impactRisk', 'inherentRiskImpact')
      .leftJoin('inherentRisk.riskLevel', 'inherentRiskLevel')
      .leftJoin('risk_heatMap.residualRisk', 'residualRisk')
      .leftJoin('residualRisk.frequencyRisk', 'residualRiskFrequency')
      .leftJoin('residualRisk.impactRisk', 'residualRiskImpact')
      .leftJoin('residualRisk.riskLevel', 'residualRiskLevel')
      .leftJoin('riskVariableFrequency.variable', 'variableFrequency')
      .leftJoin('riskVariableFrequency.frequencyRisk','frequencyRiskVariable')
      .leftJoin('variableFrequency.variable_type', 'variableFrequencyType')
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
