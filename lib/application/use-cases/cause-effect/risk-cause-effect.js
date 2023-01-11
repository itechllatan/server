import { getConnection } from "typeorm";
import RiskCauseEffect from "../../domain/risk-cause-effect";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class RiskCauseEffectUC {
    constructor({ riskCauseEffectRepository }) {
        this.riskCauseEffectRepository = riskCauseEffectRepository;
    }

    async getRiskCauseEffect(id) {
        return await this.riskCauseEffectRepository.findAll({
            relations: ['cause_effect', 'cause_effect.cause_effect_son', 'cause_effect.cause_effect_son.cause_effect_root', 'risk_heat_map'],
            fields: ['id_risk_cause_effect'],
            where: { risk_heat_map: id },
            order: { id_risk_cause_effect: 'ASC' }
        });
    }
    async saveRiskCauseEffect(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new RiskCauseEffect({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.riskCauseEffectRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
}

export default RiskCauseEffectUC;
