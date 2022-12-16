import { getConnection } from "typeorm";
import Controls from "../../domain/controls";
import WeightAssignment from '../../domain/weight-assignment'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class WeightAssignmentUC {
    constructor({ weightAssignmentRepository, }) {
        this.weightAssignmentRepository = weightAssignmentRepository;
    }

    /** */
    async getWeightAssignment() {
        return await this.weightAssignmentRepository.findAll({
            fields: ['id_weight_assignment', 'name', 'weight'],
            order: { id_weight_assignment: 'ASC' }
        });
    }

    async getWeightAssignmentById(id) {
        return await this.weightAssignmentRepository.findAll({
            fields: ['id_weight_assignment', 'name', 'weight'],
            where: { id_weight_assignment: id },
        });
    }

    async saveWeightAssignment(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new WeightAssignment({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.weightAssignmentRepository.save(this.Info);
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

export default WeightAssignmentUC;
