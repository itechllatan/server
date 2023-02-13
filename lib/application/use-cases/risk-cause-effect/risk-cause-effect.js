class RiskCauseEffectUC {
    constructor({ riskCauseEffectRepository, }) {
        this.riskCauseEffectRepository = riskCauseEffectRepository;
    }

    async deleteRiskCauseEffect(id) {
        try {
            return await this.riskCauseEffectRepository.delete(id);
        } catch (e) {
            console.log(e)
            return e;
        }
    }
}

export default RiskCauseEffectUC;
