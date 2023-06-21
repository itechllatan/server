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
            where: { risk_heat_map: id, deleted_at: null },
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
    async getCauseEffectRisk_Byid(id) {
        return await this.riskCauseEffectRepository.findAll({
            relations: ['cause_effect', 'cause_effect.cause_effect_son', 'cause_effect.cause_effect_son.cause_effect_root', 'risk_heat_map'],
            fields: ['id_risk_cause_effect'],
            where: { cause_effect: id, deleted_at: null },
            order: { id_risk_cause_effect: 'ASC' }
        });
    }

    async getRiskCauseEffectByCause(id) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'risk_cause_effect',
                    'cause_effect',
                    'cause_effect_son',
                ])
                .from('risk_cause_effect', 'risk_cause_effect')
                .innerJoin('risk_cause_effect.cause_effect', 'cause_effect')
                .innerJoin('cause_effect.cause_effect_son', 'cause_effect_son')
                .andWhere(`"cause_effect_son".id_cause_effect_son = :id and
                           "risk_cause_effect".deleted_at is null and
                           "cause_effect".deleted_at is null and
                           "cause_effect_son".deleted_at is null`)

                .setParameter('id', Number(id))
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }
}

export default RiskCauseEffectUC;
