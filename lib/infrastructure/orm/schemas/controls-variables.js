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
      name:'ID_CONTROLS_VARIABLES'
    },
    qualification: {
      type: 'decimal',
      precision: '18,4',
      name: 'QUALIFICATION'
    },
  },
  relations: {
    controls: {
      type: 'many-to-one',
      target: 'controls',
      joinColumn: {
        name: 'ID_CONTROLS',
      },
      onDelete: 'CASCADE'
    },
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'ID_VARIABLE',
      },
      onDelete: 'CASCADE'
    },
    variablesOptions: {
      type: 'many-to-one',
      target: 'variables_options',
      joinColumn: {
        name: 'ID_VARIABLES_OPTIONS',
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
  uniques: [
    {columns: [ 'controls' , 'variables','variablesOptions' ]}
  ]
});
