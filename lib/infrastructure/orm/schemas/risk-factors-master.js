import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'risk_factors_master',
  tableName: `${config.DB.PREFIX}_RISK_FACTORS_MASTER`,
  columns: {
    id_risk_factors_master: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
      length: 2000
    },
  },
});
