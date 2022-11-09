import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'frequency_risk',
  tableName: `${config.DB.PREFIX}_FREQUENCY_RISKS`,
  columns: {
    id_frequency_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
    percentage: {
      type: 'int',
    },
  },
  relations: {
  },
});
