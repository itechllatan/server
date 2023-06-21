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
      name: 'ID_PLANS_ACTION',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION',
    },
    dateStart: {
      type: 'date',
      name: 'DATESTART',
    },
    dateFinish: {
      type: 'date',
      name: 'DATEFINISH',
    },
  },
  relations: {
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'ID_RESPONSIBLES',
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
  },
});
