import { requiredParam } from '../../infrastructure/helpers/validations'
import Process from './process_id'
import Variables from './variables_id';
import TimeRanges from './time-ranges_id'
import CriticalityLevel from './criticality-level_id';

class ProcessQualification{
  constructor({
    id_process_qualification,
    process = requiredParam('controls', language),
    variables = requiredParam('variables', language),
    timeRanges = requiredParam('timeRanges', language),
    criticalityLevel = requiredParam('criticalityLevel', language),
    user,
    language
  }) {
    this.id_process_qualification = id_process_qualification;
    this.process = new Process({ validators: {}, ...process });
    this.variables = new Variables({ validators: {}, ...variables });
    this.timeRanges = new TimeRanges({ validators: {}, ...timeRanges });
    this.criticalityLevel = new CriticalityLevel({ validators: {}, ...criticalityLevel });
    this.user = user;
  }
}

export default ProcessQualification;