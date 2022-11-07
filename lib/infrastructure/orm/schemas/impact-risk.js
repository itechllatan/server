import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'impact_risk',
  tableName: `${config.DB.PREFIX}_IMPACT_RISKS`,
  columns: {
    id_impact_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
    percentage: {
      type: 'varchar',
    },
  },
  relations: {
  },
});
