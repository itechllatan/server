class ImpactRisk {
    constructor({ id_impact_risk, description, weight, heatMap, language}){
        this.id_impact_risk = id_impact_risk;
        this.description = description;
        this.weight = weight;
        this.heatMap = heatMap;
    }
}

export default ImpactRisk;