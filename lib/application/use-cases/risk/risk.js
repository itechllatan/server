import { getConnection } from "typeorm";
import RiskDomain from "../../domain/risk";
import RiskHeatMap from "../../domain/risk-heat-map";
import RiskVariableImpact from "../../domain/risk-variable-impact";
import RiskVariableFrequency from "../../domain/risk-variable-frequency";
import RiskSchema from "../../../infrastructure/orm/schemas/risk";
import RiskHeatMapSchema from "../../../infrastructure/orm/schemas/risk-heat-map";
import RiskVariableImpactSchema from "../../../infrastructure/orm/schemas/risk-variable-impact";
import RiskVariableFrequencySchema from "../../../infrastructure/orm/schemas/risk-variable-frequency";
import { InvalidPropertyError } from "../../../infrastructure/helpers/errors";

class Risk {
    constructor({ riskRepository, riskHeatMapRepository, riskVariableFrequencyRepository, riskVariableImpactRepository }) {
        this.riskRepository = riskRepository;
        this.riskHeatMapRepository = riskHeatMapRepository;
        this.riskVariableFrequencyRepository = riskVariableFrequencyRepository;
        this.riskVariableImpactRepository = riskVariableImpactRepository;
    }

    async getRisks() {
        return await this.riskRepository.findAll({
            fields: ['id_risk', 'description','name'],
        });
    }

    async insertRisk(newRisk, user) {
        try {
            await getConnection().transaction(async entityManager => {
                newRisk.user = user.id_user;
                this.risk = new RiskDomain({
                    validators: {},
                    ...newRisk
                })
                const savedRisk = await entityManager.getRepository(RiskSchema).save(this.risk);
                newRisk.risk = savedRisk.id_risk;
                this.riskHeatMap = new RiskHeatMap({
                    validators: {},
                    ...newRisk
                })
                const savedRiskHeatMap = await entityManager.getRepository(RiskHeatMapSchema).save(this.riskHeatMap);
                this.impactVariables = newRisk.impactVariables.map(variable => {
                    variable.riskHeatMap = savedRiskHeatMap.id_risk_heat_map;
                    return new RiskVariableImpact(variable)
                })
                await entityManager.getRepository(RiskVariableImpactSchema).save(this.impactVariables);
                this.frequencyVariables = newRisk.frequencyVariables.map(variable => {
                    variable.riskHeatMap = savedRiskHeatMap.id_risk_heat_map;
                    return new RiskVariableFrequency(variable)
                })
                await entityManager.getRepository(RiskVariableFrequencySchema).save(this.frequencyVariables);
            })
        } catch (err) {
            console.log(err)
            throw new InvalidPropertyError(err);
        }
    }

    async getRiskById(id) {
        try{
            const risk = await this.riskRepository.getRiskById(id);
            let idFrequency = 0;
            let tempArray = [];
            const matrixArray = [];
            const riskLevel = [];
            const impactRisk = [];
            const frequencyRisk = [];
            // REGROUP MATRIX BY IMPACT AND FREQUENCY
            risk.risk_heatMap[0].heatMap.matrix.map( element => {
                const newIdFrequency = element.frequencyRisk.id_frequency_risk;
                if(idFrequency === 0){
                    idFrequency = newIdFrequency;
                    tempArray.push(element);
                }else{
                    if(idFrequency === element.frequencyRisk.id_frequency_risk){
                        tempArray.push(element);
                    }else{
                        matrixArray.push(tempArray);
                        tempArray = [];
                        tempArray.push(element);
                        idFrequency = newIdFrequency;
                    }
                    const frequencyExist = frequencyRisk.some(frequency => frequency.id_frequency_risk === element.frequencyRisk.id_frequency_risk);
                    if (!frequencyExist) frequencyRisk.unshift(element.frequencyRisk);
                    const impactExist = impactRisk.some(impact => impact.id_impact_risk === element.impactRisk.id_impact_risk);
                    if (!impactExist) impactRisk.unshift(element.impactRisk);
                    const riskLevelExist = riskLevel.some(level => level.id_risk_level === element.riskLevel.id_risk_level);
                    if (!riskLevelExist) riskLevel.unshift(element.riskLevel);
                }
            })
            matrixArray.push(tempArray);
            const newRisk =  Object.assign({},risk);
            delete newRisk.risk_heatMap;
            newRisk.frequencyRisk = risk.risk_heatMap[0].frequencyRisk;
            newRisk.impactRisk = risk.risk_heatMap[0].impactRisk;
            newRisk.impactVariables = risk.risk_heatMap[0].risk_variable_impact;
            newRisk.frequencyVariables = risk.risk_heatMap[0].risk_variable_frequency;   
            newRisk.heatMap = risk.risk_heatMap[0].heatMap.id_heat_map;

            newRisk.impactVariables.forEach(element => {
                console.log(element)
            })
            newRisk.frequencyVariables.forEach(element =>{
                console.log(element)
            })
            
            return risk;
        }catch(err){
            console.log(err)
        }
    }
}

export default Risk;
