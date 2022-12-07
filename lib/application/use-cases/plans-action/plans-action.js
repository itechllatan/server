import { getConnection } from "typeorm";
import PlansActionDomain from '../../domain/plans-action'

class PlansActionUC {
    constructor({ plansActionRepository }) {
        this.plansActionRepository = plansActionRepository;
    }

    async getPlansAction() {
        return await this.plansActionRepository.findAll({
            relations: ['user'],
            fields: ['id_plans_action', 'name', 'description', 'dateStart', 'dateFinish', 'user'],
        });
    }

    async getPlansActionById(id) {
        return await this.plansActionRepository.findAll({
            relations: ['user'],
            fields: ['id_plans_action', 'name', 'description', 'dateStart', 'dateFinish', 'user'],
            where: { id_plans_action: id }
        });
    }

    async savePlansAction(newPlan, language) {
        this.Plan = new PlansActionDomain({
            validators: {},
            ...newPlan
        })

        try {
            let savedPlan;
            await getConnection()
                .transaction(async entityManager => {
                    savedPlan = await this.plansActionRepository.save(this.Plan);
                })
            return {
                plan: savedPlan,
            }
        } catch (err) {
            throw new InvalidPropertyError(err);
        }
    }
}

export default PlansActionUC;
