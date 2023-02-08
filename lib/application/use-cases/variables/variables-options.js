import VariablesOptions from "../../domain/variables-options";
import { getConnection } from "typeorm";
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';

class VariablesOptionsUC {
    constructor({ variablesRepository, variableTypesRepository, variablesOptionsRepository }) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
        this.variablesOptionsRepository = variablesOptionsRepository;
    }

    async getVariablesOptions() {
        return await this.variablesOptionsRepository.findAll({
            relations: ['variables'],
            fields: ["id_variables_options", "name", "description", "weight", "toDefault", "variables"],
            order: { id_variables_options: 'ASC' }
        });
    }

    async getVariableOptionById(id) {
        return await this.variablesOptionsRepository.findAll({
            relations: ['variables'],
            fields: ["id_variables_options", "name", "description", "weight", "toDefault"],
            where: { id_variables_options: id },
        });
    }

    async saveVariablesOptions(Info, language) {    
        this.Info = new VariablesOptions({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.variablesOptionsRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidPropertyError(e);
        }      
    }

    async deleteVariableOption(id, user) {
        try {
            let updDelete;
            await getConnection().transaction(async entityManager => {
                updDelete =
                    await this.variablesOptionsRepository.update(
                        { id_variables_options: id },
                        { deleted_at: new Date(), deleted_by: user.id_user }
                    );
            })

            return updDelete;
        } catch (e) {
            throw new InvalidControl(e);
        }
    }
}

export default VariablesOptionsUC;
