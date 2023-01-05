import { getConnection } from "typeorm";
import CauseEffectRoot from '../../domain/cause-effect-root'
import CauseEffectSon from "../../domain/cause-effect-son";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class CauseEffectRootUC {
    constructor({
        causeEffectRootRepository,
        causeEffectSonRepository,
    }) {
        this.causeEffectRootRepository = causeEffectRootRepository;
        this.causeEffectSonRepository = causeEffectSonRepository;
    }

    async getCauseEffectRoot() {
        return await this.causeEffectRootRepository.findAll({
            fields: ['id_cause_effect_root', 'description'],
            order: { id_cause_effect_root: 'ASC' }
        });
    }
    async saveCauseEffectRoot(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new CauseEffectRoot({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.causeEffectRootRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            throw new InvalidControl(e);
        }
    }

    async getCauseEffectSon(id) {
        return await this.causeEffectSonRepository.findAll({
            relations: ['cause_effect_root'],
            fields: ['id_cause_effect_son', 'description'],
            where: { cause_effect_root: id },
        });
    }
    async saveCauseEffectSon(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new CauseEffectSon({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.causeEffectSonRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }
}

export default CauseEffectRootUC;
