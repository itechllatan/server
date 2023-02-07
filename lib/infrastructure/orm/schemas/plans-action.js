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
      length: 2000
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
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'id_responsibles',
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
