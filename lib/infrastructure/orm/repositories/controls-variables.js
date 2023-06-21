import CommonRepository from './common';
import ControlsVariablesSchema from '../schemas/controls-variables'
import { getRepository, getConnection, getManager } from 'typeorm';

class ControlsVariablesRepository extends CommonRepository {
  constructor() {
    super(ControlsVariablesSchema);
    this.conn = getRepository(ControlsVariablesSchema)
  }

  async getControlVariableOptions(id, type) {
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `SELECT "a".id_variable "id_variable", "a".name "name", "a".id_variable_type "id_variable_type"
      , nvl("b".id_controls_variables,0) "id_controls_variables"
      , nvl("b".id_controls,0) "id_controls"
      , nvl("b".id_variable,0) "id_variable"
      , nvl("b".id_variables_options,0) "id_variables_options"
      , nvl("b".qualification,0) "qualification"
      , "c".name "control"
      , "d".name "opcion"
      FROM "MR_VARIABLES" "a" 
      LEFT JOIN "MR_CONTROLS_VARIABLES" "b" ON "b".id_variable = "a".id_variable AND "b".id_controls = :id
      LEFT JOIN "MR_CONTROLS" "c" ON "c".id_controls = "b".id_controls
      LEFT JOIN "MR_VARIABLES_OPTIONS" "d" ON "d".id_variables_options = "b".id_variables_options
      WHERE "a".id_variable_type = :type
      ORDER BY "a".id_variable ASC`, [parseInt(id), parseInt(type)]);
    return someQuery
  }

  // async getControlVariableOptions(id, type) {
  //   const builder = getConnection()
  //     .createQueryBuilder()
  //     .select([
  //       'variables.id_variable',
  //       'variables.name',
  //       'variables.variable_type.id_variable_type'
  //     ])
  //     .from('variables', 'variables')
  //     .leftJoin('controlsVariables.id_controls_variables', 'controlsVariables')     
  //     .where('variables.variable_type = :type')
  //     .setParameter('type', type)

  //     .orderBy('variables.id_variable')
  //     //.cache(true);
  //   return await builder.getMany();
  // }

}

export default ControlsVariablesRepository;;
