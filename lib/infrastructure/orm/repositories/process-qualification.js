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
      `SELECT "a".id_variable, "a".name, "a".id_variable_type
      , nvl("b".id_process,0) "id_process"
      , nvl("b".id_variable,0) "id_variable"
      , nvl("b".id_time_ranges,0) "id_time_ranges"
      , nvl("b".id_criticality_level,0) "id_criticality_level"
      , "c".name "process"
      , "d".since "range"
      , "e".name "level"
      FROM "MR_VARIABLES" "a" 
      LEFT JOIN "MR_PROCESS_QUALIFICATION" "b" ON "b".id_variable = "a".id_variable AND "b".id_process = :id
      LEFT JOIN "MR_PROCESS" "c" ON "c".id_process = "b".id_process
      LEFT JOIN "MR_TIME_RANGES" "d" ON "d".id_time_ranges = "b".id_time_ranges
      LEFT JOIN "MR_CRITICALITY_LEVEL" "e" ON "e".id_criticality_level = "b".id_criticality_level
      WHERE "a".id_variable_type = :type
      ORDER BY "a".id_variable ASC`, [parseInt(id), parseInt(type)]);
    return someQuery
  }
}

export default ProcessQualificationRepository;;
