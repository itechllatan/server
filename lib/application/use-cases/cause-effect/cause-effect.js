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

    async getCauseEffect(query) {
        return await this.causeEffectRepository.getAllCauseEffect(query);
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
                .andWhere(`(upper(cause_effect.name) like :text or 
                            upper(cause_effect.description) like :text) and
                            "cause_effect".deleted_at is null`)
                .setParameter('text', `%${text.toUpperCase()}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteCauseEffect(id) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.causeEffectRepository.update(
                        { id_cause_effect: id },
                        { deleted_at: new Date() }
                    );
            })

            return updDelete;
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

    async getCauseEffectAll() {
        return await this.causeEffectRepository.findAll({
            fields: ['id_cause_effect', 'name', 'description',],
        });
    }
}

export default CauseEffectUC;
