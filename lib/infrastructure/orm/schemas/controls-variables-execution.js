import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls_var_execution',
  tableName: `${config.DB.PREFIX}_CONTROLS_VAR_EXECUTION`,
  columns: {
    ...baseColumns,
    id_controls_var_execution: {
      primary: true,
      type: 'int',
      generated: true,
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
    variablesExecution: {
      type: 'many-to-one',
      target: 'variables_execution',
      joinColumn: {
        name: 'id_variables_execution',
      },
      onDelete: 'CASCADE'
    },
    variablesExecutionOptions: {
      type: 'many-to-one',
      target: 'variables_execution_options',
      joinColumn: {
        name: 'id_variables_execution_options',
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
