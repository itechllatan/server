import { requiredParam } from "../../infrastructure/helpers/validations";
import ImpactRisk from "./impact-risk";
import RiskType from "./risk-type";

class ImpactRiskRating {
    constructor({ id_impact_risk_rating, riskType = requiredParam('riskType', language), impactRisk = requiredParam('impactRisk', language), language}){
        this.id_impact_risk_rating = id_impact_risk_rating;
        this.riskType = new RiskType({ validators: {}, language, ...riskType });
        this.impactRisk = new ImpactRisk({ validators: {}, language, ...impactRisk });
    }
}

export default ImpactRiskRating;