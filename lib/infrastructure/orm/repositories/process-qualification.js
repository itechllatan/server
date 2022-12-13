import CommonRepository from './common';
import ProcessQualificationSchema from '../schemas/process-qualification'
import { getRepository, getConnection, getManager } from 'typeorm';

class ProcessQualificationRepository extends CommonRepository {
  constructor() {
    super(ProcessQualificationSchema);
    this.conn = getRepository(ProcessQualificationSchema)
  }

  async getProcessQualification(id, type) {
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `SELECT "a"."id_variable", "a"."name", "a"."id_variable_type"
      , nvl("b"."id_process",0) "id_process"
      , nvl("b"."id_variable",0) "id_variable"
      , nvl("b"."id_ranges_time",0) "id_ranges_time"
      , nvl("b"."id_level_criticality",0) "id_level_criticality"
      , "c"."name" "process"
      , "d"."since" "range"
      , "e"."name" "level"
      FROM "MR_VARIABLES" "a" 
      LEFT JOIN "MR_PROCESS_QUALIFICATION" "b" ON "b"."id_variable" = "a"."id_variable" AND "b"."id_process" = :id
      LEFT JOIN "MR_PROCESS" "c" ON "c"."id_process" = "b"."id_process"
      LEFT JOIN "MR_RANGES_TIME" "d" ON "d"."id_ranges_time" = "b"."id_ranges_time"
      LEFT JOIN "MR_LEVEL_CRITICALITY" "e" ON "e"."id_level_criticality" = "b"."id_level_criticality"
      WHERE "a"."id_variable_type" = :type
      ORDER BY "a"."id_variable" ASC`, [parseInt(id), parseInt(type)]);
    return someQuery
  }
}

export default ProcessQualificationRepository;;
