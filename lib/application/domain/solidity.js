import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';
import LevelCriticalityColor from './level-criticality-color';

class Solidity {
  constructor({
    id_solidity,
    name = requiredParam('name', language),
    description,
    weight_since = requiredParam('weight_since', language),
    weight_until = requiredParam('weight_until', language),
    levelCriticalityColor = requiredParam('levelCriticalityColor', language),
    user,
    language
  }) {
    this.id_solidity = id_solidity;
    this.name = name;
    this.description = description;
    this.weight_since = weight_since;
    this.weight_until = weight_until;
    this.levelCriticalityColor = new LevelCriticalityColor({ validators: {}, ...levelCriticalityColor });
    this.user = new UserProcess({ validators: {}, ...user });
  }
}

export default Solidity;