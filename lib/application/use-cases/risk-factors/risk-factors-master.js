import { getConnection } from "typeorm";
import RiskFactorsMaster from '../../domain/risk-factors-master'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class RiskFactorsUC {
    constructor({
        riskFactorsMasterRepository,
    }) {
        this.riskFactorsMasterRepository = riskFactorsMasterRepository;
    }

    async getRiskFactorsMaster() {
        return await this.riskFactorsMasterRepository.findAll({
            fields: ['id_risk_factors_master', 'description'],
            order: { id_risk_factors_master: 'ASC' }
        });
    }
    async saveRiskFactorsMaster(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.Info = new RiskFactorsMaster({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.riskFactorsMasterRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
}

export default RiskFactorsUC;
