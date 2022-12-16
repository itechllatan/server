import { getConnection } from "typeorm";
import RiskDomain from "../../domain/risk";
import RiskHeatMap from "../../domain/risk-heat-map";
import RiskVariableImpact from "../../domain/risk-variable-impact";
import RiskVariableFrequency from "../../domain/risk-variable-frequency";
import RiskSchema from "../../../infrastructure/orm/schemas/risk";
import RiskHeatMapSchema from "../../../infrastructure/orm/schemas/risk-heat-map";
import RiskVariableImpactSchema from "../../../infrastructure/orm/schemas/risk-variable-impact";
import RiskVariableFrequencySchema from "../../../infrastructure/orm/schemas/risk-variable-frequency";

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
                const savedRiskImpactVariables = await entityManager.getRepository(RiskVariableImpactSchema).save(this.impactVariables);
                this.frequencyVariables = newRisk.frequencyVariables.map(variable => {
                    variable.riskHeatMap = savedRiskHeatMap.id_risk_heat_map;
                    return new RiskVariableFrequency(variable)
                })
                const savedRiskFrequencyVariables = await entityManager.getRepository(RiskVariableFrequencySchema).save(this.frequencyVariables);
                console.log(savedRiskFrequencyVariables);
            })
        } catch (err) {
            console.log(err)
            throw new InvalidPropertyError(err);
        }
    }

    async getRiskById(id) {
        return await this.riskRepository.findAll({
            fields: ['id_risk', 'description', 'name'],
            where: { id_risk: id }
        })
    }
}

export default Risk;
