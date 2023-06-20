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
      name: 'ID_FREQUENCY_RISK'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name: 'DESCRIPTION'
    },
    weight: {
      type: 'number',
      name: 'WEIGHT'
    },
  },
  relations: {
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'ID_HEAT_MAP',
        },
        onDelete: 'CASCADE'
    },
  },
});
