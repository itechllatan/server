import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls',
  tableName: `${config.DB.PREFIX}_CONTROLS`,
  columns: {
    ...baseColumns,
    id_controls: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    qualification_design: {
      type: 'decimal',
      precision: '18,2'
    },
    qualification_execution: {
      type: 'decimal',
      precision: '18,2'
    },
    description: {
      type: 'varchar',
      nullable: true
    },
  },
  relations: {
    controlsVariables: {
      type: 'one-to-many',
      target: 'controls_variables',
      inverseSide: 'controls'
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
