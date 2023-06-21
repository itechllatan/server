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
      name: 'ID_PLANS_ACTION_CONTROLS',
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
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'ID_CONTROLS',
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
    {columns: [ 'plansAction' , 'controls' ]}
  ]
});
