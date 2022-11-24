import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'macroprocessRisk',
  tableName: `${config.DB.PREFIX}_MACROPROCESS_RISK`,
  columns: {
    ...baseColumns,
    id_macroprocess_risk: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    macroprocess: {
      type: 'many-to-one',
      target: 'macro_process',
      joinColumn: {
        name: 'id_macro_process',
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
