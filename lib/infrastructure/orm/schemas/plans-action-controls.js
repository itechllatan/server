import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'plans_action_controls',
  tableName: `${config.DB.PREFIX}_PLANS_ACTION_CONTROLS`,
  columns: {
    ...baseColumns,
    id_plans_action_controls: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    plansAction: {
      type: 'many-to-one',
      target: 'plans_action',
      joinColumn: {
        name: 'id_plans_action',
      },
      onDelete: 'CASCADE'
    },
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'id_controls',
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
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'deleted_by',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'plansAction' , 'controls' ]}
  ]
});
