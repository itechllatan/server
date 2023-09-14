import { requiredParam } from '../../infrastructure/helpers/validations'
import UserProcess from './user-process';

class Solidity {
  constructor({
    id_solidity,
    name = requiredParam('name', language),
    description,
    weight_since = requiredParam('weight_since', language),
    weight_until = requiredParam('weight_until', language),
    color = requiredParam('color', language),
    per_assigned_frequency = requiredParam('% de frecuencia asignado', language),
    per_assigned_impact = requiredParam('% de impacto asignado', language),
    user,
    language
  }) {
    this.id_solidity = id_solidity;
    this.name = name;
    this.description = description;
    this.weight_since = weight_since;
    this.weight_until = weight_until;
    this.color = color;
    this.per_assigned_frequency = per_assigned_frequency;
    this.per_assigned_impact = per_assigned_impact;
    this.user = user;
  }
}

export default Solidity;