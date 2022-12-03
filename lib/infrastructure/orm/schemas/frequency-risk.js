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
    weight: {
      type: 'number',
    },
  },
  relations: {
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'id_heat_map',
        },
        onDelete: 'CASCADE'
    },
  },
});
