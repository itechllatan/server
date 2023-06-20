import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'plans_action_process',
  tableName: `${config.DB.PREFIX}_PLANS_ACTION_PROCESS`,
  columns: {
    ...baseColumns,
    id_plans_action_process: {
      primary: true,
      type: 'int',
      generated: true,
      name:'ID_PLANS_ACTION_PROCESS'
    },
  },
  relations: {
    plansAction: {
      type: 'many-to-one',
      target: 'plans_action',
      joinColumn: {
        name: 'ID_PLANS_ACTION',
      },
      onDelete: 'CASCADE'
    },
    process: {
      type: 'many-to-one',
      target: 'process',
      joinColumn: {
        name: 'ID_PROCESS',
      },
      onDelete: 'CASCADE'
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE'
    },
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'DELETED_BY',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'plansAction' , 'process' ]}
  ]
});
