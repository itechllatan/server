import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk',
  tableName: `${config.DB.PREFIX}_RISKS`,
  columns: {
    ...baseColumns,
    id_risk: {
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
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
      onDelete: 'CASCADE'
    },
    risk_heatMap: {
      type: 'one-to-many',
      target: 'risk_heat_map',
      inverseSide: 'risk',
    },
  },
});
