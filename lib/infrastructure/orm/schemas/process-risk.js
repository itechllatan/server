import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'processRisk',
  tableName: `${config.DB.PREFIX}_PROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_process_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  indices: [
    {
      name: 'IDX_id_process_risk',
      columns: [
        'id_process_risk'
      ]
    },
  ],
  relations: {
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'id_process',
      },
      onDelete: 'CASCADE'
    },
    risk: {
      type: 'many-to-one',
      target: 'risk',
      joinColumn: {
        name: 'id_risk',
      },
      onDelete: 'CASCADE'
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
      onDelete: 'CASCADE'
    },
  },
});
