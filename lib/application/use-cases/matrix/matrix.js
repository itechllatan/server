import { getConnection } from "typeorm";
import HeatMap from "../../domain/heat-map";
import Frequency from "../../domain/frequency-risk";
import Impact from "../../domain/impact-risk";
import RiskLevel from "../../domain/risk-level";
import MatrixDomain from "../../domain/matrix";
import MatrixSchema from '../../../infrastructure/orm/schemas/matrix';
import FrequencySchema from '../../../infrastructure/orm/schemas/frequency-risk';
import HeatMapSchema from '../../../infrastructure/orm/schemas/heat-map';
import ImpactSchema from '../../../infrastructure/orm/schemas/impact-risk';
import RiskLevelSchema from '../../../infrastructure/orm/schemas/risk-level';
import { InvalidMatrix } from '../../../infrastructure/helpers/errors';

class Matrix {
    constructor({ matrixRepository, frequencyRepository, impactRepository, heatMapRepository, riskLevelRepository }) {
        this.matrixRepository = matrixRepository;
        this.frequencyRepository = frequencyRepository;
        this.impactRepository = impactRepository;
        this.heatMapRepository = heatMapRepository;
        this.riskLevelRepository = riskLevelRepository;
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

    async createDefaultMatrix (newHeatMap, user){
        try{
            newHeatMap.user = user.id_user;
            const frequency = ['Improbable', 'Posible','Ocasional', 'Probable','Frecuente'];
            const impact = ['Insignificante','Menor','Moderado','Mayor','Catastrófico'];
            const riskLevel = [
                {name: 'Bajo', color:'rgb(41, 170, 108)'},
                {name: 'Medio', color:'rgb(255, 192, 67)'},
                {name: 'Alto', color:'rgb(242, 118, 73)'},
                {name: 'Extremo', color:'rgb(242, 82, 82)'}
            ]
            await getConnection().transaction(async entityManager => {
                this.heatMap = new HeatMap({
                    validators: {},
                    ...newHeatMap
                })
                const savedHeatMap = await entityManager.getRepository(HeatMapSchema).save(this.heatMap);

                this.frequencys = frequency?.map(
                    (element, index) =>
                        new Frequency({
                            validators: {},
                            ...{
                                description: element,
                                weight: index + 1,
                                heatMap: savedHeatMap.id_heat_map
                            }
                        })
                );
                
                const savedFrequency = await entityManager.getRepository(FrequencySchema).save(this.frequencys);
                const frequencysId = savedFrequency.map((frequency) => frequency.id_frequency_risk);

                this.impacts = impact?.map(
                    (element, index) =>
                        new Impact({
                            validators: {},
                            ...{
                                description: element,
                                weight: index + 1,
                                heatMap: savedHeatMap.id_heat_map
                            }
                        })
                );
                
                const savedImpact = await entityManager.getRepository(ImpactSchema).save(this.impacts);
                const impactsId = savedImpact.map((impact) => impact.id_impact_risk);
                        
                this.risksLevel = riskLevel?.map(
                    (element) =>
                        new RiskLevel({
                            validators: {},
                            ...{
                                name: element.name,
                                description: element.name,
                                color: element.color,
                                heatMap: savedHeatMap.id_heat_map
                            }
                        })
                )
                const savedRiskLevel = await entityManager.getRepository(RiskLevelSchema).save(this.risksLevel);
                const riskLevelsIds = savedRiskLevel.map((riskLevel) => riskLevel.id_risk_level);
                    
                this.matrix = []
                frequencysId.forEach((row, indexX) =>{
                    impactsId.forEach((column, indexY) =>{
                        const number = indexX + indexY;
                        let newColor = '';
                        if(number < 3) newColor = riskLevelsIds[0];
                        else if(number < 5) newColor = riskLevelsIds[1];
                        else if(number < 7) newColor = riskLevelsIds[2];
                        else if(number < 9) newColor = riskLevelsIds[3];
                        const newMatrix =new MatrixDomain({
                            validators: {},
                            ...{
                                frequencyRisk: row,
                                impactRisk: column,
                                riskLevel: newColor,
                                heatMap: savedHeatMap.id_heat_map
                            }
                        })
                        this.matrix.push(newMatrix);
                    }
                    )
                })
                await entityManager.getRepository(MatrixSchema).save(this.matrix);
            })

            return { message: 'Mapa creado satisfactoriamente'}
        }catch(error){
            throw new InvalidMatrix('Error al crear la matriz',
                'matriz');
        }
    }
}

export default Matrix;
