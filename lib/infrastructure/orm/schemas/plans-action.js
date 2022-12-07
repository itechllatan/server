import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'plans_action',
  tableName: `${config.DB.PREFIX}_PLANS_ACTION`,
  columns: {
    ...baseColumns,
    id_plans_action: {
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
    dateStart: {
      type: 'date',
    },
    dateFinish: {
      type: 'date',
    },
  },
  relations: {
    //responsable
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
