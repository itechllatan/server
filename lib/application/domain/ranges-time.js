import UserProcess from './user-process';
import UnitTime from './unit-time'
import LevelCriticality from './level-criticality_id';
import { validateIsNotNegativeValue, validateJustNumber, requiredParam } from '../../infrastructure/helpers/validations';

class RangesTime {
    constructor({
        id_ranges_time,
        since = requiredParam('since', language),
        until = requiredParam('until', language),
        unitTime = requiredParam('unitTime', language),
        levelCriticality = requiredParam('levelCriticality', language),
        user = requiredParam('user', language),
        language
    }) {
        validateJustNumber(id_ranges_time, 'id_ranges_time', language);
        validateIsNotNegativeValue(id_ranges_time, 'id_ranges_time', language);
        this.id_ranges_time = id_ranges_time;
        this.since = since;
        this.until = until;
        this.unitTime = new UnitTime({ validators: {}, ...unitTime });
        this.levelCriticality = new LevelCriticality({ validators: {}, ...levelCriticality });
        this.user = new UserProcess({ validators: {}, ...user });
    }
}

export default RangesTime;