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
            where: { deleted_at: null },
        });
    }

    async getPlansActionById(id) {
        return await this.plansActionRepository.findAll({
            relations: ['responsibles'],
            fields: ['id_plans_action', 'name', 'description', 'dateStart', 'dateFinish'],
            where: { id_plans_action: id, deleted_at: null }
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

    async getPlansActionText(text) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select(['plans_action', 'responsibles'])
                .from('plans_action', 'plans_action')
                .leftJoin('plans_action.responsibles', 'responsibles')
                .andWhere(`( upper(plans_action.name) like :text or 
                             upper(plans_action.description) like :text) and
                             "plans_action"."deleted_at" is null`)
                .setParameter('text', `%${text.toUpperCase()}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }

    async deletePlansAction(id) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.plansActionRepository.update(
                        { id_plans_action: id },
                        { deleted_at: new Date() }
                    );
            })

            return updDelete;
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }
}

export default PlansActionUC;
