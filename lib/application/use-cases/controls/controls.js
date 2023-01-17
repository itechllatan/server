import { getConnection } from "typeorm";
import Controls from "../../domain/controls";
import ControlsVariables from '../../domain/controls-variables'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class ControlsUC {
    constructor({
        controlsRepository,
        controlsVariablesRepository, }) {
        this.controlsRepository = controlsRepository;
        this.controlsVariablesRepository = controlsVariablesRepository;
    }

    /** */
    async getControls() {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral', 'solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design', 'final_execution', 'value_solidity'],
            order: { id_controls: 'ASC' }
        });
    }

    async getControlsById(id) {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral', 'solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design', 'final_execution', 'value_solidity'],
            where: { id_controls: id },
        });
    }

    async saveControls(Info, user, language) {
        const mess = language && language === 'en' ? message_en : message;
        Info.user = user.id_user;
        this.controlInfo = new Controls({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.controlsRepository.save(this.controlInfo);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

    async saveControlVariableOptions(Info, user, language) {
        const mess = language && language === 'en' ? message_en : message;
        Info.user = user.id_user;
        this.Info = new ControlsVariables({
            validators: {},
            ...Info,
        });

        try {
            let saveControl;
            await getConnection().transaction(async entityManager => {
                saveControl = await this.controlsVariablesRepository.save(this.Info);
            })
            return {
                saveControl,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

    async getControlByText2(text) {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral', 'solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design', 'final_execution', 'value_solidity'],
            where: { name: text },
        });
    }

    async getControlByText(text) {
        /*try {
            let builder = getConnection()
                .createQueryBuilder()
                .select(['macro_process.id_macro_process'])
                .from('macro_process', 'macro_process')
                .where('macro_process.id_macro_process = :id')
                .setParameter('id', id)
                .cache(true);

            let builder =
                getConnection()
                .createQueryBuilder()
                .from('macro_process', 'macro_process')
                builder.andWhere(
                    `(contact.first_name like :like
                    or contact.email like :like
                    or user.email like :like
                    or propertyDetail.reference like :like
                    or propertyDetail.lot_reference like :like
                    or contact.phone_number like :like)`
                );

            builder = builder.setParameter('like', `%${query.reference}%`);

            return await builder.getOne();
        } catch (e) {
            console.log(e);
        }*/
    }
}

export default ControlsUC;
