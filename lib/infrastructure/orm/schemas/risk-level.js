import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'risk_level',
  tableName: `${config.DB.PREFIX}_RISK_LEVEL`,
  columns: {
    id_risk_level: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    color: {
      type: 'varchar',
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
