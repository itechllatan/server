import { getConnection } from "typeorm";
import Controls from "../../domain/controls";
import ControlsVariablesDesign from '../../domain/controls-variables-design'
import ControlsVariablesExecution from '../../domain/controls-variables-execution'
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class ControlsUC {
    constructor({
        controlsRepository,
        controlsVariablesDesignRepository,
        controlsVariablesExecutionRepository }) {
        this.controlsRepository = controlsRepository;
        this.controlsVariablesDesignRepository = controlsVariablesDesignRepository;
        this.controlsVariablesExecutionRepository = controlsVariablesExecutionRepository;
    }

    /** */
    async getControls() {
        return await this.controlsRepository.findAll({
            relations: ['user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'user'],
            order: { id_controls: 'ASC' }
        });
    }

    async getControlsById(id) {
        try {
            return await this.controlsRepository.findAll({
                relations: ['user'],
                fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'user'],
                where: { id_controls: id },
            });
        } catch (error) {
            console.log('error', error)
            throw new InvalidControl('Error en control', 'control');
        }
    }

    async saveControls(Info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.controlInfo = new Controls({
            validators: {},
            ...Info,
        });

        try {
            let saveControl;
            await getConnection().transaction(async entityManager => {
                saveControl = await this.controlsRepository.save(this.controlInfo);
            })
            return {
                saveControl,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

    async saveControlVarDesignOptions(info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.info = new ControlsVariablesDesign({
            validators: {},
            ...info,
        });

        try {
            console.log('this.info', this.info)
            let saveControlDesign;
            await getConnection().transaction(async entityManager => {
                saveControlDesign = await this.controlsVariablesDesignRepository.save(this.info);
            })
            return {
                saveControlDesign,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }
    
    async saveControlVarExecutionOptions(info, language) {
        const mess = language && language === 'en' ? message_en : message;
        this.info = new ControlsVariablesExecution({
            validators: {},
            ...info,
        });

        try {
            console.log('this.info', this.info)
            let saveControlExecution;
            await getConnection().transaction(async entityManager => {
                saveControlExecution = await this.controlsVariablesExecutionRepository.save(this.info);
            })
            return {
                saveControlExecution,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }
}

export default ControlsUC;
