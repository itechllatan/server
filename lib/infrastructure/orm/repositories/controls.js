import CommonRepository from './common';
import ControlsSchema from '../schemas/controls'
import { getRepository, getConnection, getManager } from 'typeorm';

class ControlsRepository extends CommonRepository {
  constructor() {
    super(ControlsSchema);
    this.conn = getRepository(ControlsSchema)
  }

  async getControlVarDesignOptions(id) {
    const entityManager = getManager();
    // const someQuery = await entityManager.query(
    //   `SELECT "a"."id_controls_var_design", "a"."id_controls", "a"."id_variables_design", "a"."id_variables_design_options",
    //           "b"."id_controls", "b"."name", "b"."qualification_design", "b"."qualification_execution","b"."description",
    //           "c"."id_variables_design", "c"."name", "c"."description", "c"."weight",
    //           "d"."id_variables_design_options", "d"."name", "d"."description", "d"."weight"
    //   FROM MR_CONTROLS_VAR_DESIGN "a"
    //   JOIN MR_CONTROLS "b" ON "b"."id_controls" = "a"."id_controls" AND "a"."id_controls" = :id
    //   RIGHT JOIN MR_VARIABLES_DESIGN "c" ON "c"."id_variables_design" = "a"."id_variables_design"
    //   LEFT JOIN MR_VARIABLES_DESIGN_OPTIONS "d" ON "d"."id_variables_design_options" = "a"."id_variables_design_options"
    //   ORDER BY "c"."id_variables_design"`, [id]);

    // const someQuery = await entityManager.query(
    //   `SELECT "a"."id_variables_design", "a"."name", "a"."description", "a"."weight"
    //   , nvl("b"."id_controls_var_design",0) id_controls_var_design
    //   , nvl("b"."id_controls",0) id_controls
    //   , nvl("b"."id_variables_design",0) id_variables_design
    //   , nvl("b"."id_variables_design_options",0) id_variables_design_options
    //   , nvl("c"."id_controls",0) id_controls, "c"."name", "c"."qualification_design", "c"."qualification_execution", "c"."description"
    //   , nvl("d"."id_variables_design_options",0) id_variables_design_options, "d"."name", "d"."description", "d"."weight"
    //   from MR_VARIABLES_DESIGN "a"
    //   LEFT JOIN MR_CONTROLS_VAR_DESIGN "b" ON "b"."id_variables_design" = "a"."id_variables_design"
    //   LEFT JOIN MR_CONTROLS "c" ON "c"."id_controls" = "b"."id_controls" AND "c"."id_controls" = :id
    //   LEFT JOIN MR_VARIABLES_DESIGN_OPTIONS "d" ON "d"."id_variables_design_options" = "b"."id_variables_design_options"
    //   ORDER BY "a"."id_variables_design"`, [id]);
    const someQuery = await entityManager.query(
      `SELECT "a"."id_variables_design" "id_variables_design", "a"."name" "name"
      , nvl("b"."id_controls_var_design",0) "id_controls_var_design"
      , nvl("b"."id_controls",0) "id_controls"
      , nvl("b"."id_variables_design",0) "id_variables_design"
      , nvl("b"."id_variables_design_options",0) "id_variables_design_options"
      , "c"."name" "control"
      , "d"."name" "opcion"
      from MR_VARIABLES_DESIGN "a"
      LEFT JOIN MR_CONTROLS_VAR_DESIGN "b" ON "b"."id_variables_design" = "a"."id_variables_design"  AND "b"."id_controls" = :id
      LEFT JOIN MR_CONTROLS "c" ON "c"."id_controls" = "b"."id_controls"
      LEFT JOIN MR_VARIABLES_DESIGN_OPTIONS "d" ON "d"."id_variables_design_options" = "b"."id_variables_design_options"
      ORDER BY "a"."id_variables_design"`, [parseInt(id)]);
    return someQuery
  }

  async getControlVarExecutionOptions(id) {
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `
      SELECT "a"."id_variables_execution", "a"."name"
      , nvl("b"."id_controls_var_execution",0) "id_controls_var_execution"
      , nvl("b"."id_controls",0) "id_controls"
      , nvl("b"."id_variables_execution",0) "id_variables_execution"
      , nvl("b"."id_variables_execution_options",0) "id_variables_execution_options"
      , "c"."name" "control"
      , "d"."name" "opcion"
      from MR_VARIABLES_EXECUTION "a"
      LEFT JOIN MR_CONTROLS_VAR_EXECUTION "b" ON "b"."id_variables_execution" = "a"."id_variables_execution" AND "b"."id_controls" = :id
      LEFT JOIN MR_CONTROLS "c" ON "c"."id_controls" = "b"."id_controls"
      LEFT JOIN MR_VARIABLES_EXECUTION_OPTIONS "d" ON "d"."id_variables_execution_options" = "b"."id_variables_execution_options"
      ORDER BY "a"."id_variables_execution"`, [parseInt(id)]);
    return someQuery
  }
}

export default ControlsRepository;
