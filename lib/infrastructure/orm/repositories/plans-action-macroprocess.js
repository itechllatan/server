import CommonRepository from './common';
import PlansActionMacroProcessSchema from '../schemas/plans-action-macroprocess'
import { getRepository } from 'typeorm';

class PlansActionMacroProcessRepository extends CommonRepository {
  constructor() {
    super(PlansActionMacroProcessSchema);
    this.conn = getRepository(PlansActionMacroProcessSchema)
  }
}

export default PlansActionMacroProcessRepository;
