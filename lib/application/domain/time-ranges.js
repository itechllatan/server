import UnitTime from './unit-time'
import CriticalityLevel from './criticality-level_id';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class TimeRanges {
    constructor({
        id_time_ranges,
        since = requiredParam('since', language),
        until = requiredParam('until', language),
        unitTime = requiredParam('unitTime', language),
        criticalityLevel = requiredParam('criticalityLevel', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_time_ranges, 'id_time_ranges', language);
        validateIsNotNegativeValue(id_time_ranges, 'id_time_ranges', language);
        this.id_time_ranges = id_time_ranges;
        this.since = since;
        this.until = until;
        this.unitTime = new UnitTime({ validators: {}, ...unitTime });
        this.criticalityLevel = new CriticalityLevel({ validators: {}, ...criticalityLevel });
        this.user = user;
    }
}

export default TimeRanges;