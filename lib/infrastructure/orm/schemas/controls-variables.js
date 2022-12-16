import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls_variables',
  tableName: `${config.DB.PREFIX}_CONTROLS_VARIABLES`,
  columns: {
    ...baseColumns,
    id_controls_variables: {
      primary: true,
      type: 'int',
      generated: true,
    },
    qualification: {
      type: 'decimal',
      precision: '18,4'
    },
  },
  relations: {
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'id_controls',
      },
      onDelete: 'CASCADE'
    },
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'id_variable',
      },
      onDelete: 'CASCADE'
    },
    variablesOptions: {
      type: 'many-to-one',
      target: 'variables_options',
      joinColumn: {
        name: 'id_variables_options',
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
  uniques: [
    {columns: [ 'controls' , 'variables','variablesOptions' ]}
  ]
});
