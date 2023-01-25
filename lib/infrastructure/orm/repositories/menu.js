import CommonRepository from './common';
import MenuSchema from '../schemas/menu';
import { getRepository } from 'typeorm';

class MenuRepository extends CommonRepository {
  constructor() {
    super(MenuSchema);
    this.conn = getRepository(MenuSchema)
  }
}

export default MenuRepository;
