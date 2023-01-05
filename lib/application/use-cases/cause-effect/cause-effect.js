import { getConnection } from "typeorm";
import CauseEffect from "../../domain/cause-effect";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class CauseEffectUC {
    constructor({
        causeEffectRepository
    }) {
        this.causeEffectRepository = causeEffectRepository;
    }

    async getCauseEffect() {
        return await this.causeEffectRepository.findAll({
            relations: ['cause_effect_son'],
            fields: ['id_cause_effect', 'name', 'description'],
            order: { id_cause_effect: 'ASC' }
        });
    }
    async saveCauseEffect(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new CauseEffect({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.causeEffectRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
}

export default CauseEffectUC;
