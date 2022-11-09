import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'risk_type',
  tableName: `${config.DB.PREFIX}_RISK_TYPES`,
  columns: {
    id_risk_type: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
});
