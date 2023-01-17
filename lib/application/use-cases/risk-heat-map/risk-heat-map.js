import { IsNull } from "typeorm";

class Risk {
    constructor({ riskHeatMapRepository, plansActionRepository, controlsRepository, processRepository, matrixRepository}) {
        this.riskHeatMapRepository = riskHeatMapRepository;
        this.plansActionRepository = plansActionRepository;
        this.controlsRepository = controlsRepository;
        this.processRepository = processRepository;
        this.matrixRepository = matrixRepository;
    }

    async getDashboardByRiskHeatMap(id) {
        try{
            const process = await this.processRepository.findAll({where: { deleted_at : IsNull()}});
            const plans = await this.plansActionRepository.findAll({  where: { deleted_at : IsNull() }});
            const controls = await this.controlsRepository.findAll({  where: { deleted_at : IsNull() }});
            
            const riskHeatMap = await this.riskHeatMapRepository.findAll({
                relations: ['inherentRisk','heatMap'],
                where: { heatMap : id },
            });

            const matrix = await this.matrixRepository.findAll({
                relations: ["frequencyRisk", "impactRisk","riskLevel", "heatMap"],
                where: { heatMap: id },
                order: { frequencyRisk: "DESC", impactRisk: "ASC"}
            })
            let idFrequency = 0;
            let riskTemp = [].concat(riskHeatMap);
            let tempArray = [];
            const matrixArray = [];
            matrix.map( element => {
                riskTemp.forEach((risk, index) => {
                    if(risk.inherentRisk.id_matrix === element.id_matrix) {
                        element.quantity = element.quantity ? element.quantity++ : 1;
                        riskTemp.slice(index, 1)
                    }
                })
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
                }
    
            })
            matrixArray.push(tempArray);

            const statistics = [
                { name: 'Procesos', quantity: process.length },
                { name: 'Riesgos', quantity: riskHeatMap.length},
                { name: 'Controles', quantity: controls.length},
                { name: 'Planes de acción', quantity: plans.length},
            ]                                                                                                                                                                                                                                                                                                                                                                                                
            return { matrixArray, statistics, riskHeatMapQuantity: riskHeatMap.length };
        }catch(e){
            console.log(e)
            return e;
        }
        
    }

}

export default Risk;
