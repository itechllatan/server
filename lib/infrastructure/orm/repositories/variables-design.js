import CommonRepository from './common';
import VariablesDesignSchema from '../schemas/variables-design';
import { getRepository, getConnection, getManager } from 'typeorm';

class VariablesDesignRepository extends CommonRepository {
  constructor() {
    super(VariablesDesignSchema);
    this.conn = getRepository(VariablesDesignSchema)
  }

  async getPrueba2(id) {
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

    const someQuery = await entityManager.query(
      `SELECT "a"."id_variables_design", "a"."name", "a"."description", "a"."weight"
      ,"b"."id_controls_var_design", "b"."id_controls", "b"."id_variables_design", "b"."id_variables_design_options"
      ,"c"."id_controls", "c"."name", "c"."qualification_design", "c"."qualification_execution", "c"."description"
      ,"d"."id_variables_design_options", "d"."name", "d"."description", "d"."weight"
      from MR_VARIABLES_DESIGN "a"
      LEFT JOIN MR_CONTROLS_VAR_DESIGN "b" ON "b"."id_variables_design" = "a"."id_variables_design"
      LEFT JOIN MR_CONTROLS "c" ON "c"."id_controls" = "b"."id_controls" AND "c"."id_controls" = :id
      LEFT JOIN MR_VARIABLES_DESIGN_OPTIONS "d" ON "d"."id_variables_design_options" = "b"."id_variables_design_options"
      ORDER BY "a"."id_variables_design"`, [id]);
    return someQuery
  }
}

export default VariablesDesignRepository;
