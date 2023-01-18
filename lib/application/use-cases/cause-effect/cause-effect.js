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
            relations: ['cause_effect_son', 'cause_effect_son.cause_effect_root'],
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

    async getCauseEffectText(text) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'cause_effect',
                    'cause_effect_son',
                    'cause_effect_root'
                ])
                .from('cause_effect', 'cause_effect')
                .leftJoin('cause_effect.cause_effect_son', 'cause_effect_son')
                .leftJoin('cause_effect_son.cause_effect_root', 'cause_effect_root')
                .andWhere(`(cause_effect.name like :text 
                    or cause_effect.description like :text)`)
                .setParameter('text', `%${text}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }
}

export default CauseEffectUC;
