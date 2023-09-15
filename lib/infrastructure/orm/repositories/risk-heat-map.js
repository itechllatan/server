import CommonRepository from './common';
import RiskHeatMapSchema from '../schemas/risk-heat-map';
import { getRepository, getConnection, } from 'typeorm';

class RiskHeatMapRepository extends CommonRepository {
  constructor() {
    super(RiskHeatMapSchema);
    this.conn = getRepository(RiskHeatMapSchema)
  }

  async getRiskReport(id_heat_map) {
    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'risk_heat_map.id_risk_heat_map',
        'risk_heat_map.percentage_inherent_risk_frequency', 'risk_heat_map.percentage_inherent_risk_impact',
        'risk_heat_map.percentage_residual_risk_frequency', 'risk_heat_map.percentage_residual_risk_impact',
        'risk.id_risk', 'risk.name', 'risk.description', 'risk.reference', 'heatMap.id_heat_map', 'heatMap.name',
        'inherentRisk', 'frequencyRisk', 'impactRisk', 'riskLevel',

        'control_risk', 'controls',
        'residualRisk', 'frequencyRiskResidual', 'impactRiskResidual', 'riskLevelResidual',
        'plans_action_risk', 'plansAction', 'responsiblesPlan',
        'subprocessRisk', 'subprocess',
        'macroprocessRisk', 'macroprocess',
        'processRisk', 'process',
        'risk_cause_effect', 'cause_effect', 'cause_effect_son', 'cause_effect_root',
        'riskFactorRisk', 'risk_factor',
        'riskResponsible', 'responsible',

        'risk_variable_frequency', 'risk_variable_impact',
  
        'frequencyRiskVariable', 'variableFrequency', 'variableFrequencyType',
        'impactRiskVariable', 'variableImpact', 'variableImpactType',
      ])
      .from('risk_heat_map', 'risk_heat_map')
      .innerJoin('risk_heat_map.risk', 'risk')
      .innerJoin('risk_heat_map.heatMap', 'heatMap')
      .innerJoin('risk_heat_map.inherentRisk', 'inherentRisk')
      .innerJoin('inherentRisk.frequencyRisk', 'frequencyRisk')
      .innerJoin('inherentRisk.impactRisk', 'impactRisk')
      .innerJoin('inherentRisk.riskLevel', 'riskLevel')


      .leftJoin('risk_heat_map.control_risk', 'control_risk')
      .leftJoin('control_risk.controls', 'controls')

      .leftJoin('risk_heat_map.residualRisk', 'residualRisk')
      .leftJoin('residualRisk.frequencyRisk', 'frequencyRiskResidual')
      .leftJoin('residualRisk.impactRisk', 'impactRiskResidual')
      .leftJoin('residualRisk.riskLevel', 'riskLevelResidual')
      .leftJoin('risk_heat_map.plans_action_risk', 'plans_action_risk')
      .leftJoin('plans_action_risk.plansAction', 'plansAction')

      .leftJoin('plansAction.responsibles', 'responsiblesPlan')

      .leftJoin('risk_heat_map.subprocessRisk', 'subprocessRisk')
      .leftJoin('subprocessRisk.subprocess', 'subprocess')
      .leftJoin('risk_heat_map.macroprocessRisk', 'macroprocessRisk')
      .leftJoin('macroprocessRisk.macroprocess', 'macroprocess')
      .leftJoin('risk_heat_map.processRisk', 'processRisk')
      .leftJoin('processRisk.process', 'process')
      .leftJoin('risk_heat_map.risk_cause_effect', 'risk_cause_effect')
      .leftJoin('risk_cause_effect.cause_effect', 'cause_effect')
      .leftJoin('cause_effect.cause_effect_son', 'cause_effect_son')
      .leftJoin('cause_effect_son.cause_effect_root', 'cause_effect_root')
      .leftJoin('risk_heat_map.riskFactorRisk', 'riskFactorRisk')
      .leftJoin('riskFactorRisk.risk_factor', 'risk_factor')
      .leftJoin('risk_heat_map.riskResponsible', 'riskResponsible')
      .leftJoin('riskResponsible.responsible', 'responsible')


      
      .leftJoin('risk_heat_map.risk_variable_frequency', 'risk_variable_frequency')
      .leftJoin('risk_heat_map.risk_variable_impact', 'risk_variable_impact')

      .leftJoin('risk_variable_frequency.variable', 'variableFrequency')
      .leftJoin('risk_variable_frequency.frequencyRisk', 'frequencyRiskVariable')
      .leftJoin('variableFrequency.variable_type', 'variableFrequencyType')

      .leftJoin('risk_variable_impact.variable', 'variableImpact')
      .leftJoin('risk_variable_impact.impactRisk', 'impactRiskVariable')
      .leftJoin('variableImpact.variable_type', 'variableImpactType')

      .where('risk_heat_map.heatMap = :id')
      //.where('risk_heat_map.id_risk_heat_map = 42')
      .setParameter('id', id_heat_map);

    return await builder.getMany();
    /*
    select 
    m.ID_RISK_HEAT_MAP,
    m.PERCENTAGE_INHERENT_RISK_FREQUENCY, m.PERCENTAGE_INHERENT_RISK_IMPACT,
    m.PERCENTAGE_RESIDUAL_RISK_FREQUENCY, m.PERCENTAGE_RESIDUAL_RISK_IMPACT,
    m.ID_RISK, m.ID_HEAT_MAP, m.ID_MATRIX_RESIDUAL, m.ID_MATRIX_INHERENT,
    inh.ID_FREQUENCY_RISK, f.description, inh.ID_IMPACT_RISK, i.description, inh.ID_RISK_LEVEL
    from mr_risk_heat_map m 
    join mr_matrix inh on inh.id_matrix = m.ID_MATRIX_INHERENT
    join MR_FREQUENCY_RISKS f on f.id_frequency_risk = inh.id_frequency_risk
    join MR_IMPACT_RISKS i on i.id_impact_risk = inh.id_impact_risk
    where m.id_heat_map = 2
    and m.id_risk_heat_map = 42;
    */
  }

}

export default RiskHeatMapRepository;
