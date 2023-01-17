import { getConnection } from "typeorm";
import PlansActionDomain from '../../domain/plans-action'
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';

import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.process;
const message_en = messages_en.process;

class PlansActionUC {
    constructor({ plansActionRepository }) {
        this.plansActionRepository = plansActionRepository;
    }

    async getPlansAction() {
        return await this.plansActionRepository.findAll({
            relations: ['responsibles'],
            fields: ['id_plans_action', 'name', 'description', 'dateStart', 'dateFinish'],
        });
    }

    async getPlansActionById(id) {
        return await this.plansActionRepository.findAll({
            relations: ['responsibles'],
            fields: ['id_plans_action', 'name', 'description', 'dateStart', 'dateFinish'],
            where: { id_plans_action: id }
        });
    }

    async savePlansAction(Info, user, language) {
        const mess = language && language === 'en' ? message_en : message;
        Info.user = user.id_user;
        this.Info = new PlansActionDomain({
            validators: {},
            ...Info
        })

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.plansActionRepository.save(this.Info);
            })
            return {
                saveInfo,
            }
        } catch (err) {
            throw new InvalidPropertyError(err);
        }
    }
}

export default PlansActionUC;
