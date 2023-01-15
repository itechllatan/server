import ControlsRisk from '../../domain/controls-risk';
import RiskHeatMap from "../../domain/risk-heat-map";
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';
import { getConnection } from "typeorm";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.macro_process;
const message_en = messages_en.macro_process;

class ControlsRiskUC {
  constructor({ controlsRiskRepository, frequencyRiskRepository, impactRiskRepository, matrixRepository, riskHeatMapRepository }) {
    this.controlsRiskRepository = controlsRiskRepository;
    this.frequencyRiskRepository = frequencyRiskRepository;
    this.impactRiskRepository = impactRiskRepository;
    this.matrixRepository = matrixRepository;
    this.riskHeatMapRepository = riskHeatMapRepository;
  }

  async getControlsRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.controlsRiskRepository.findAll({
      relations: ['controls', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
      ],
      fields: ["id_controls_risk", "mitigate_impact", "mitigate_frequency"],
      where: { controls: id }
    });
  }

  async saveControlsRisk(info, language) {
    const mess = language && language === 'en' ? message_en : message;
    this.info = new ControlsRisk({
      validators: {},
      ...info,
    });
    console.log(this.info);
    const saveInfo = await this.controlsRiskRepository.save(this.info);
    
    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    const controlRisk = await this.controlsRiskRepository.findAll({
      relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
      where: { risk_heat_map: this.info.risk_heat_map.id_risk_heat_map, controls: this.info.controls.id_controls }
    })
    console.log("CONTROLS RISK ", controlRisk)
    const frequency = await this.frequencyRiskRepository.findAll({
      where: {heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map},
      order: { weight: "ASC" }
    })
    console.log("FRE ", frequency)
    const impact = await this.impactRiskRepository.findAll({
        where: {heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map},
        order: { weight: "ASC" }
    })
    console.log("IMP ", impact)
        
    let quantityControls = 0;
    let impactControl = 0;
    let frequencyControl = 0;
    controlRisk.forEach( control => {
      const calculateImpact = (control.controls.value_solidity * control.mitigate_impact) / 100;
      const calculateFrequency = (control.controls.value_solidity * control.mitigate_frequency) / 100;
      console.log("CANCLULATE IMPACT ", calculateImpact)
      console.log("CANCLULATE FREQ ", calculateFrequency)
      const residualImpact = control.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (control.risk_heat_map.percentage_inherent_risk_impact /100)) * 100)

      const residualFrequency = control.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (control.risk_heat_map.percentage_inherent_risk_frequency /100)) * 100)
      quantityControls++;
      impactControl += residualImpact;
      frequencyControl += residualFrequency;
    })
    let entryFrequency = 0;
    let tempFrequency = {};
    frequency.forEach(fre => {
        if(((fre.weight * (100 / frequency.length)) > (frequencyControl / quantityControls)) && entryFrequency === 0){
            entryFrequency++;
            tempFrequency = fre;
        }
    })
    let entryImpact = 0;
    let tempImpact = {};
    impact.forEach(imp => {
        if(((imp.weight * (100 / impact.length)) > (impactControl / quantityControls)) && entryImpact === 0){
            entryImpact = 1;
            tempImpact = imp;
        }
    })
    const matrix = await this.matrixRepository.findAll({
      relations: ['riskLevel'],
      where: {
        frequencyRisk: tempFrequency.id_frequency_risk, 
        impactRisk: tempImpact.id_impact_risk, 
        heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map 
      }
    })
    console.log(matrix);

    const riskHeatMap = {
      id_risk_heat_map: this.info.risk_heat_map.id_risk_heat_map,
      percentage_residual_risk_frequency: (frequencyControl / quantityControls).toFixed(2),
      percentage_residual_risk_impact: (impactControl / quantityControls).toFixed(2),
      residualRisk : matrix[0].id_matrix
    }
    console.log(riskHeatMap)
    this.riskHeatMap = new RiskHeatMap({
      validators: {},
      ...riskHeatMap
    })
    this.riskHeatMapRepository.save(this.riskHeatMap);

    return {
      saveInfo,
    };
  }

}

export default ControlsRiskUC;
