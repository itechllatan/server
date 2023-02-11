import { IsNull, getConnection } from "typeorm";
import MacroProcessRisk from "../../../infrastructure/orm/schemas/macroprocess-risk";
import ProcessRisk from "../../../infrastructure/orm/schemas/process-risk";
import SubProcessRisk from "../../../infrastructure/orm/schemas/subprocess-risk";
import PlanActionsRisk from "../../../infrastructure/orm/schemas/plans-action-risk";
import ControlsRisk from "../../../infrastructure/orm/schemas/controls-risk";
import CauseEffectRisk from "../../../infrastructure/orm/schemas/risk-cause-effect";

class RiskHeatMap {
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
                for(let i = 0; i < riskTemp.length; i++ ){
                    if(riskTemp[i]?.inherentRisk?.id_matrix === element.id_matrix) {
                        element.quantity = element.quantity ? element.quantity + 1 : 1;
                        riskTemp.splice(i, 1)
                        i--;
                    }
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


    async deleteById(id, user ){
        try{
            await getConnection().transaction(async entityManager => {
                await entityManager.getRepository(MacroProcessRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await entityManager.getRepository(ProcessRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await entityManager.getRepository(SubProcessRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await entityManager.getRepository(PlanActionsRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await entityManager.getRepository(ControlsRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await entityManager.getRepository(CauseEffectRisk).update(
                    { risk_heat_map: Number(id) },
                    { deleted_at: new Date() }
                )
                await this.riskHeatMapRepository.update(
                    { id_risk_heat_map: Number(id) },
                    {
                        deleted_at: new Date(),
                        deleted_by: user.id_user
                    }
                );
                return { message: "Updated successfully"}
            })
        }catch(e){
            return e;
        }
    }
}

export default RiskHeatMap;
