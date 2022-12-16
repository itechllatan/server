import { requiredParam } from '../../infrastructure/helpers/validations'

class WeightAssignment {
  constructor({
    id_weight_assignment,
    name = requiredParam('name', language),
    weight = requiredParam('v', language),
    user,
    language
  }) {
    this.id_weight_assignment = id_weight_assignment;
    this.name = name;
    this.weight = weight;
    this.user = user;
  }
}

export default WeightAssignment;