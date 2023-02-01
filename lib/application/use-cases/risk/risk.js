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
        controlRiskRepository, frequencyRiskRepository, impactRiskRepository, matrixRepository,planActionRiskRepository }) {
        this.riskRepository = riskRepository;
        this.controlRiskRepository = controlRiskRepository;
        this.planActionRiskRepository = planActionRiskRepository;
    }

    async getRisks() {
        const risks = await this.riskRepository.findAll({
            relations: ['risk_heatMap', 'risk_heatMap.heatMap', 'risk_heatMap.control_risk', 'risk_heatMap.control_risk.controls',
                'risk_heatMap.inherentRisk', 'risk_heatMap.inherentRisk.riskLevel', 'risk_heatMap.inherentRisk.frequencyRisk', 'risk_heatMap.inherentRisk.impactRisk',
                'risk_heatMap.residualRisk', 'risk_heatMap.residualRisk.riskLevel', 'risk_heatMap.residualRisk.frequencyRisk', 'risk_heatMap.residualRisk.impactRisk'
            ],
            fields: ['id_risk', 'description', 'name'],
        });
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
        try {
            const risk = await this.riskRepository.getRiskById(id);
            let idFrequency = 0;
            let tempArray = [];
            const matrixArray = [];
            const riskLevel = [];
            const impactRisk = [];
            const frequencyRisk = [];
            // REGROUP MATRIX BY IMPACT AND FREQUENCY
            risk.risk_heatMap[0].heatMap.matrix.map(element => {
                if (element.id_matrix === risk.risk_heatMap[0]?.inherentRisk?.id_matrix) {
                    element.isInherentRisk = true;
                }
                const newIdFrequency = element.frequencyRisk.id_frequency_risk;
                if (idFrequency === 0) {
                    idFrequency = newIdFrequency;
                    tempArray.push(element);
                } else {
                    if (idFrequency === element.frequencyRisk.id_frequency_risk) {
                        tempArray.push(element);
                    } else {
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
            const newRisk = Object.assign({}, risk);
            newRisk.frequencyRisk = risk.risk_heatMap[0].frequencyRisk;
            newRisk.impactRisk = risk.risk_heatMap[0].impactRisk;
            newRisk.impactVariables = risk.risk_heatMap[0].risk_variable_impact;
            newRisk.frequencyVariables = risk.risk_heatMap[0].risk_variable_frequency;
            newRisk.heatMap = risk.risk_heatMap[0].heatMap.id_heat_map;
            newRisk.matrix = matrixArray;
            newRisk.inherentRisk = risk.risk_heatMap[0].inherentRisk;
            newRisk.residualRisk = risk.risk_heatMap[0].residualRisk;
            newRisk.id_risk_heat_map = risk.risk_heatMap[0].id_risk_heat_map;
            newRisk.user = risk.user;
            console.log(newRisk)
            return newRisk;
        } catch (err) {
            console.log(err)
        }
    }

    async getControlsByRiskId(id) {
        try {
            return await this.controlRiskRepository.findAll({
                relations: ['controls', 'risk_heat_map', 'risk_heat_map.risk', 'controls.solidityGeneral'],
                fields: ["id_controls_risk", "mitigate_impact", "mitigate_frequency"],
                where: { 'risk_heat_map': id }
            })
        } catch (e) {
            console.log(e)
            return e;
        }

    }

    async getRisksText(text) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'risk',
                    'risk_heatMap',
                    'heatMap',
                    'control_risk',
                    'controls',

                    'inherentRisk',
                    'inherentRisk_riskLevel',
                    'inherentRisk_frequencyRisk',
                    'inherentRisk_impactRisk',

                    'residualRisk',
                    'residualRisk_riskLevel',
                    'residualRisk_frequencyRisk',
                    'residualRisk_impactRisk',
                ])
                .from('risk', 'risk')
                .leftJoin('risk.risk_heatMap', 'risk_heatMap')
                .leftJoin('risk_heatMap.heatMap', 'heatMap')
                .leftJoin('risk_heatMap.control_risk', 'control_risk')
                .leftJoin('control_risk.controls', 'controls')

                .leftJoin('risk_heatMap.inherentRisk', 'inherentRisk')
                .leftJoin('inherentRisk.riskLevel', 'inherentRisk_riskLevel')
                .leftJoin('inherentRisk.frequencyRisk', 'inherentRisk_frequencyRisk')
                .leftJoin('inherentRisk.impactRisk', 'inherentRisk_impactRisk')

                .leftJoin('risk_heatMap.residualRisk', 'residualRisk')
                .leftJoin('residualRisk.riskLevel', 'residualRisk_riskLevel')
                .leftJoin('residualRisk.frequencyRisk', 'residualRisk_frequencyRisk')
                .leftJoin('residualRisk.impactRisk', 'residualRisk_impactRisk')
                .andWhere(`( upper(risk.name) like :text or 
                             upper(risk.description) like :text)`)
                .setParameter('text', `%${text.toUpperCase()}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }
    
    async getPlanActionsByRiskId(id){
        try{
            return await this.planActionRiskRepository.findAll({
                relations: ['plansAction', 'risk_heat_map'],
                where: { 'risk_heat_map': id }
            })
        }catch(e){
            console.log(e)
            return e;
        }
    }
}

export default Risk;
