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

    async getControlByText(text) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'controls',//'controls.id_controls', //
                    'solidityGeneral',//'solidityGeneral.id_solidity', //
                    'solidityDesign',//'solidityDesign.id_solidity', //
                    'solidityExecution',//'solidityExecution.id_solidity', //
                    'user'//'user.id_user', //
                ])
                .from('controls', 'controls')
                .leftJoin('controls.solidityGeneral', 'solidityGeneral')
                .leftJoin('controls.solidityDesign', 'solidityDesign')
                .leftJoin('controls.solidityExecution', 'solidityExecution')
                .leftJoin('controls.user', 'user')
                .andWhere(`( upper(controls.name) like :text or 
                             upper(controls.description) like :text)`)
                .setParameter('text', `%${text.toUpperCase()}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }
}

export default ControlsUC;