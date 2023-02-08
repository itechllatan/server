import { getConnection } from "typeorm";
import CauseEffectRoot from '../../domain/cause-effect-root'
import CauseEffectSon from "../../domain/cause-effect-son";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl, InvalidPropertyError } from '../../../infrastructure/helpers/errors';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';


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
            order: { id_cause_effect_root: 'ASC' },
            where: { deleted_at: null }
        });
    }
    async saveCauseEffectRoot(Info, user, language) {
        Info.user = user.id_user;
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
            where: { deleted_at: null },
        });
    }

    async getCauseEffectSonByRoot(id) {
        return await this.causeEffectSonRepository.findAll({
            relations: ['cause_effect_root'],
            fields: ['id_cause_effect_son', 'description'],
            where: { cause_effect_root: id, deleted_at: null },
        });
    }

    async saveCauseEffectSon(Info, user, language) {
        Info.user = user.id_user;
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

    async deleteCauseEffectRoot(id, user) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.causeEffectRootRepository.update(
                        { id_cause_effect_root: id },
                        { deleted_at: new Date(), deleted_by: user.id_user }
                    );
            })

            return updDelete;
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
    async deleteCauseEffectSon(id, user) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.causeEffectSonRepository.update(
                        { id_cause_effect_son: id },
                        { deleted_at: new Date(), deleted_by: user.id_user }
                    );
            })

            return updDelete;
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
}

export default CauseEffectRootUC;
