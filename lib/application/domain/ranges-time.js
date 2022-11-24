import UserProcess from './user-process';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class RangesTime {
    constructor({
        id_ranges_time,
        since = requiredParam('since', language),
        until = requiredParam('until', language),
        unit_measurement = requiredParam('unit_measurement', language),
        level_criticality = requiredParam('level_criticality', language),
        percentage,
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_ranges_time, 'id_ranges_time', language);
        validateIsNotNegativeValue(id_ranges_time, 'id_ranges_time', language);
        this.id_ranges_time = id_ranges_time;
        this.since = since;
        this.until = until;
        this.unit_measurement = unit_measurement;
        this.level_criticality = level_criticality;
        this.percentage = percentage;
        this.user = new UserProcess({ validators: {}, ...user });
    }
}

export default RangesTime;