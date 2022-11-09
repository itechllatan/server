import { getConnection } from "typeorm";
import RiskDomain from "../../domain/risk";
import ImpactRiskRatingSchema from "../../../infrastructure/orm/schemas/impact-risk-rating"

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
        console.log(newRisk)
        this.risk = new RiskDomain({
            validators: {},
            ...newRisk
        })
        try{
            let savedRisk, savedImpactRiskRating;
            const risk = { ...this.risk, impactRiskRating: undefined};

            await getConnection().transaction( async entityManager => {
                savedRisk = await this.riskRepository.save(this.risk);
                console.log(savedRisk);
                if(this.risk.impactRiskRating){
                    for (const rating of this.risk.impactRiskRating){
                        rating.risk = savedRisk.id_risk;
                    }
                }
                console.log(this.risk.impactRiskRating)
                savedImpactRiskRating = await entityManager.getRepository(ImpactRiskRatingSchema).save(this.risk.impactRiskRating)
            })
            return {
                risk: savedRisk,
                impactRiskRating: savedImpactRiskRating
            }
        }catch (err) {
            throw new InvalidPropertyError(err);
        }
    }
  }
  
  export default Risk;
  