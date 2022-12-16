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
            relations: ['solidityGeneral','solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design','final_execution','value_solidity'],
            order: { id_controls: 'ASC' }
        });
    }

    async getControlsById(id) {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral','solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design','final_execution','value_solidity'],
            where: { id_controls: id },
        });
    }

    async saveControls(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
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

    async saveControlVariableOptions(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
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
}

export default ControlsUC;