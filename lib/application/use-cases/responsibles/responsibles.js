import { getConnection } from "typeorm";
import Responsibles from "../../domain/responsibles";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class ResponsiblesUC {
    constructor({ responsiblesRepository, }) {
        this.responsiblesRepository = responsiblesRepository;
    }

    async getResponsibles() {
        return await this.responsiblesRepository.findAll({
            order: { id_responsibles: 'ASC' },
            where: { deleted_at: null }
        });
    }

    async getResponsiblesById(id) {
        return await this.responsiblesRepository.findAll({
            where: { id_responsibles: id, deleted_at: null },
        });
    }

    async saveResponsibles(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new Responsibles({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.responsiblesRepository.save(this.Info);
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

export default ResponsiblesUC;
