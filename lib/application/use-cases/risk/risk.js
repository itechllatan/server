import { getConnection } from "typeorm";
import RiskDomain from "../../domain/risk";

class Risk {
    constructor({ riskRepository }) {
      this.riskRepository = riskRepository;
    }

    async getRisks() {
        return await this.riskRepository.findAll({
            fields: ['id_risk', 'description'],
        });
    }
    
    async insertRisk(newRisk){
        this.risk = new RiskDomain({
            validators: {},
            ...newRisk
        })
        try{
            let savedRisk;

            await getConnection().transaction( async entityManager => {
                savedRisk = await this.riskRepository.save(this.risk);
            })
            return {
                risk: savedRisk,
            }
        }catch (err) {
            throw new InvalidPropertyError(err);
        }
    }

    async getRiskById(id){
        return await this.riskRepository.findAll({
            fields: ['id_risk', 'description', 'name'],
            where: {id_risk : id}
        })
    }
  }
  
  export default Risk;
  