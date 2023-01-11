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
    constructor({ riskRepository, riskHeatMapRepository, riskVariableFrequencyRepository, riskVariableImpactRepository, 
        controlRiskRepository, frequencyRiskRepository, impactRiskRepository, matrixRepository }) {
        this.riskRepository = riskRepository;
        this.riskHeatMapRepository = riskHeatMapRepository;
        this.riskVariableFrequencyRepository = riskVariableFrequencyRepository;
        this.riskVariableImpactRepository = riskVariableImpactRepository;
        this.controlRiskRepository = controlRiskRepository;
        this.frequencyRiskRepository = frequencyRiskRepository;
        this.impactRiskRepository = impactRiskRepository;
        this.matrixRepository = matrixRepository;
    }

    async getRisks() {
        const risks = await this.riskRepository.findAll({
            relations: ['risk_heatMap','risk_heatMap.heatMap','risk_heatMap.inherentRisk','risk_heatMap.inherentRisk.riskLevel', 
            'risk_heatMap.control_risk','risk_heatMap.control_risk.controls',
            'risk_heatMap.inherentRisk.frequencyRisk', 'risk_heatMap.inherentRisk.impactRisk'
        ],
            fields: ['id_risk', 'description','name'],
        });

        const frequency = await this.frequencyRiskRepository.findAll({
            where: {heatMap: risks[0].risk_heatMap[0].heatMap?.id_heat_map},
            order: { weight: "ASC" }
        })
        const impact = await this.impactRiskRepository.findAll({
            where: {heatMap: risks[0].risk_heatMap[0].heatMap?.id_heat_map},
            order: { weight: "ASC" }
        })

        for(const risk of risks){
            const controlRisk = risk?.risk_heatMap?.[0]?.control_risk;
            if(controlRisk && controlRisk.length > 0){
                let quantityControls = 0;
                let impactControl = 0;
                let frequencyControl = 0;
                controlRisk.forEach(control => {
                    quantityControls++;
                    const impactRisk = (100 / impact.length) * risk.risk_heatMap[0].inherentRisk.impactRisk.weight;
                    const frequencyRisk = (100 / frequency.length) * risk.risk_heatMap[0].inherentRisk.frequencyRisk.weight;
                    const calculateImpact = ((control.controls.value_solidity/100) * (control.mitigate_impact/100));
                    const calculateFrequency = ((control.controls.value_solidity/100) * (control.mitigate_frequency/100));
                    const residualImpact =  impactRisk  - ((calculateImpact * (impactRisk /100)) * 100);
                    const residualFrequency =  frequencyRisk  - ((calculateFrequency * (frequencyRisk /100)) * 100);
                    impactControl += residualImpact;
                    frequencyControl += residualFrequency;
                })
                risk.risk_heatMap[0].residualRisk = {}
                let entryFrequency = 0;
                frequency.forEach(fre => {
                    if(((fre.weight * (100 / frequency.length)) > (frequencyControl / quantityControls)) && entryFrequency === 0){
                        entryFrequency++;
                        risk.risk_heatMap[0].residualRisk.frequencyRisk = fre;
                        risk.risk_heatMap[0].residualRisk.frequencyRisk.percentage = frequencyControl / quantityControls;
                    }
                })
                let entryImpact = 0;
                impact.forEach(imp => {
                    if(((imp.weight * (100 / impact.length)) > (impactControl / quantityControls)) && entryImpact === 0){
                        entryImpact = 1;
                        risk.risk_heatMap[0].residualRisk.impactRisk = imp;
                        risk.risk_heatMap[0].residualRisk.impactRisk.percentage = impactControl / quantityControls;
                    }
                })
                const matrix = await this.matrixRepository.findAll({
                    relations: ['riskLevel'],
                    where: {frequencyRisk: risk.risk_heatMap[0].residualRisk.frequencyRisk.id_frequency_risk, 
                        impactRisk: risk.risk_heatMap[0].residualRisk.impactRisk?.id_impact_risk, 
                        heatMap: risk.risk_heatMap[0].heatMap?.id_heat_map }
                })
                risk.risk_heatMap[0].residualRisk.riskLevel = matrix[0].riskLevel;
            }else{
                risk.risk_heatMap[0].residualRisk = risk.risk_heatMap[0].inherentRisk;
                risk.risk_heatMap[0].residualRisk.frequencyRisk.percentage = risk.risk_heatMap[0].residualRisk.frequencyRisk.weight * (100/frequency.length);
                risk.risk_heatMap[0].residualRisk.impactRisk.percentage = risk.risk_heatMap[0].residualRisk.impactRisk.weight * (100/impact.length);
            }
        }
        return risks;
    }

    async insertRisk(newRisk, user) {
        try {
            let risk;
            let riskHeatMap;
            await getConnection().transaction(async entityManager => {
                newRisk.user = user.id_user;
                this.risk = new RiskDomain({
                    validators: {},
                    ...newRisk
                })
                const savedRisk = await entityManager.getRepository(RiskSchema).save(this.risk);
                risk = savedRisk;
                newRisk.risk = savedRisk.id_risk;
                this.riskHeatMap = new RiskHeatMap({
                    validators: {},
                    ...newRisk
                })
                const savedRiskHeatMap = await entityManager.getRepository(RiskHeatMapSchema).save(this.riskHeatMap);
                riskHeatMap = savedRiskHeatMap;
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
            return { risk, riskHeatMap }
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
            console.log(risk.risk_heatMap[0].inherentRisk)
            // REGROUP MATRIX BY IMPACT AND FREQUENCY
            risk.risk_heatMap[0].heatMap.matrix.map( element => {
                console.log("ELEMENT ", element)
                if(element.id_matrix === risk.risk_heatMap[0]?.inherentRisk?.id_matrix){
                    element.isInherentRisk = true;
                }
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
            newRisk.matrix = matrixArray
            newRisk.inherentRisk = risk.risk_heatMap[0].inherentRisk;
            newRisk.inherentRisk.frequencyRisk.percentage = (100 / matrixArray.length) * newRisk.inherentRisk.frequencyRisk.weight;
            newRisk.inherentRisk.impactRisk.percentage = (100/matrixArray[0].length) * newRisk.inherentRisk.impactRisk.weight;
            newRisk.id_risk_heat_map = risk.risk_heatMap[0].id_risk_heat_map;
            console.log(newRisk)
            return newRisk;
        }catch(err){
            console.log(err)
        }
    }

    async getControlsByRiskId(id){
        try{
            return await this.controlRiskRepository.findAll({
                relations: ['controls', 'risk_heat_map', 'risk_heat_map.risk','controls.solidityGeneral'],
                fields: ["id_controls_risk", "mitigate_impact", "mitigate_frequency"],
                where: { 'risk_heat_map': id }
            })
        }catch(e){
            console.log(e)
            return e;
        }
        
    }
}

export default Risk;
