import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'subprocessRisk',
  tableName: `${config.DB.PREFIX}_SUBPROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_subprocess_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    subprocess: {
      type: 'many-to-one',
      target: 'subprocess',
      joinColumn: {
        name: 'id_subprocess',
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
