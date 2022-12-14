import Variable from "../../domain/variable";
import VariableType from "../../domain/variable-type";
import VariableTypeSchema from '../../../infrastructure/orm/schemas/variable-types';
import VariableSchema from '../../../infrastructure/orm/schemas/variables';
import { getConnection } from "typeorm";
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';
class VariablesUC {
    constructor({ variablesRepository, variableTypesRepository}) {
        this.variablesRepository = variablesRepository;
        this.variableTypesRepository = variableTypesRepository;
    }

    async getRiskVariables() {
        return await this.variableTypesRepository.findAll({
            relations: ['variables'],
            where: [{ id_variable_type: 1 }, { id_variable_type: 2 }],
        });
    }

    async insertRiskVariables(body, user){
        try{
            const variableType = await this.variableTypesRepository.findOne({
                where: {id_variable_type: body.id_variable_type}
            })
            
            if(variableType){
                await getConnection().transaction(async entityManager => {
                        this.variableType = new VariableType(body);
                        let variables = await this.variablesRepository.findAll({
                            where: {variable_type: body.id_variable_type}
                        })
                        this.newVariables = body.variables.map(variable => {
                            variable.variable_type = {id_variable_type: body.id_variable_type}
                            variable.user = user;
                            variables = variables.filter(el => el.id_variable != variable.id_variable);
                            return new Variable(variable)
                        })
                        await entityManager.getRepository(VariableTypeSchema).save(this.variableType);
                        await entityManager.getRepository(VariableSchema).save(this.newVariables);
                        if(variables.length > 0){
                            this.variables = variables.map(variable => {
                                variable.variable_type = {id_variable_type: body.id_variable_type}
                                variable.user = user;
                                return  new Variable(variable)
                            });
                            await entityManager.getRepository(VariableSchema).delete(this.variables);
                        }
                })
            }
            return { message: 'Variables guardadas satisfactoriamente'}
        }catch(err){
            console.log(err)
            throw new InvalidPropertyError(err);
        }
        
    }

}

export default VariablesUC;
