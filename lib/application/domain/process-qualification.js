import { requiredParam } from '../../infrastructure/helpers/validations'
import Process from './process_id'
import Variables from './variables_id';
import RangesTime from './ranges-time_id'
import LevelCriticality from './level-criticality_id'

class ProcessQualification{
  constructor({
    id_process_qualification,
    process = requiredParam('controls', language),
    variables = requiredParam('variables', language),
    rangesTime = requiredParam('rangesTime', language),
    levelCriticality = requiredParam('levelCriticality', language),
    user,
    language
  }) {
    this.id_process_qualification = id_process_qualification;
    this.process = new Process({ validators: {}, ...process });
    this.variables = new Variables({ validators: {}, ...variables });
    this.rangesTime = new RangesTime({ validators: {}, ...rangesTime });
    this.levelCriticality = new LevelCriticality({ validators: {}, ...levelCriticality });
    this.user = user;
  }
}

export default ProcessQualification;