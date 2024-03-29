import { getConnection } from "typeorm";
import Controls from "../../domain/controls";
import ControlsSchema from '../../../infrastructure/orm/schemas/controls';
import ControlsVariables from '../../domain/controls-variables'
import ControlsVariablesSchema from '../../../infrastructure/orm/schemas/controls-variables';
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
    async getControls(query) {
        return await this.controlsRepository.getAllControls(query);
    }

    async getControlsAll() {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral', 'solidityDesign', 'solidityExecution',
                'controlsVariables',
                'controlsVariables.variables',
                'controlsVariables.variablesOptions',
                'controlsVariables.variables.variable_type',
            ],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design', 'final_execution', 'value_solidity'],
            where: { deleted_at: null },
        });
    }

    async getControlsById(id) {
        return await this.controlsRepository.findAll({
            relations: ['solidityGeneral', 'solidityDesign', 'solidityExecution', 'user'],
            fields: ['id_controls', 'name', 'qualification_design', 'qualification_execution', 'description', 'final_design', 'final_execution', 'value_solidity'],
            where: { id_controls: id, deleted_at: null },
        });
    }

    async saveControls_ANT(Info, user, language) {
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

    async saveControls(Info, user, language) {
        const mess = language && language === 'en' ? message_en : message;
        let saveInfo;
        let saveVarDesign;
        let saveVarExecution;
        await getConnection().transaction(async entityManager => {
            try {
                Info.user = user.id_user;
                console.log("🚀🥵 ~ file: controls.js:77 ~ ControlsUC ~ awaitgetConnection ~ Info:", Info)
                this.controlInfo = new Controls({
                    validators: {},
                    ...Info,
                });
                saveInfo = await entityManager.getRepository(ControlsSchema).save(this.controlInfo);
                
                this.controlsVar = Info?.VarDesign?.map(
                    (element) =>
                        new ControlsVariables({
                            validators: {},
                            controls: saveInfo.id_controls,
                            variables: element.id_variable,
                            variablesOptions: element.id_variables_options,
                            user: user.id_user,
                            ...element,
                        })
                );
                saveVarDesign = await entityManager.getRepository(ControlsVariablesSchema).save(this.controlsVar);

                this.controlsVar = Info?.VarExecution?.map(
                    (element) =>
                        new ControlsVariables({
                            validators: {},
                            controls: saveInfo.id_controls,
                            variables: element.id_variable,
                            variablesOptions: element.id_variables_options,
                            user: user.id_user,
                            ...element,
                        })
                );
                saveVarExecution = await entityManager.getRepository(ControlsVariablesSchema).save(this.controlsVar);

            } catch (e) {
                console.log('error', e)
                throw new InvalidControl(e);
            }
        })
        return {
            saveInfo,
            saveVarDesign,
            saveVarExecution,
        };
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
                    'controls',
                    'solidityGeneral',
                    'solidityDesign',
                    'solidityExecution',
                    'user'
                ])
                .from('controls', 'controls')
                .leftJoin('controls.solidityGeneral', 'solidityGeneral')
                .leftJoin('controls.solidityDesign', 'solidityDesign')
                .leftJoin('controls.solidityExecution', 'solidityExecution')
                .leftJoin('controls.user', 'user')
                .andWhere(`(upper(controls.name) like :text or 
                            upper(controls.description) like :text) and
                            "controls".deleted_at is null`)
                .setParameter('text', `%${text.toUpperCase()}%`)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteControl(id) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.controlsRepository.update(
                        { id_controls: id },
                        { deleted_at: new Date() }
                    );
            })

            return updDelete;
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

    async getControlVariableOptionsByVariable(id) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'controls_variables',
                    'controls',
                    'variables',
                ])
                .from('controls_variables', 'controls_variables')
                .innerJoin('controls_variables.controls', 'controls')
                .leftJoin('controls_variables.variables', 'variables')
                .andWhere(`"variables".id_variable = :id and
                           "variables".deleted_at is null and
                           "controls".deleted_at is null`)
                .setParameter('id', id)
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }

    async getControlVariableOptionsByVariableOption(id) {
        try {
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'controls_variables',
                    'controls',
                    'variables',
                    'variablesOptions'
                ])
                .from('controls_variables', 'controls_variables')
                .innerJoin('controls_variables.controls', 'controls')
                .innerJoin('controls_variables.variables', 'variables')
                .innerJoin('controls_variables.variablesOptions', 'variablesOptions')
                .andWhere(`"variablesOptions".id_variables_options = :id and
                           "variablesOptions".deleted_at is null and
                           "variables".deleted_at is null and
                           "controls".deleted_at is null`)
                .setParameter('id', Number(id))
                .cache(true);
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }
}

export default ControlsUC;