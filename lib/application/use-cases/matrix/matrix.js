import { getConnection } from "typeorm";
import RiskDomain from "../../domain/risk";

class Matrix {
    constructor({ matrixRepository }) {
        this.matrixRepository = matrixRepository;
    }

    async getMatrixByHeatMap(id) {
        const matrix = await this.matrixRepository.findAll({
            relations: ["frequencyRisk", "impactRisk","riskLevel", "heatMap"],
            where: { heatMap: id },
            order: { frequencyRisk: "DESC", impactRisk: "ASC"}
        })
        let idFrequency = 0;
        let tempArray = [];
        const matrixArray = [];
        const riskLevel = [];
        const impactRisk = [];
        const frequencyRisk = [];
        matrix.map( element => {
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

        return [
            matrixArray,
            riskLevel,
            impactRisk,
            frequencyRisk
        ];
    }
}

export default Matrix;
