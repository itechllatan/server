import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'variables_execution_options',
  tableName: `${config.DB.PREFIX}_VARIABLES_EXECUTION_OPTIONS`,
  columns: {
    id_variables_execution_options: {
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
    weight: {
      type: 'decimal',
      precision: '18,2'
    },
    toDefault: {
      type: 'int',
    },
  },
  relations: {
    variablesExecution: {
      type: 'many-to-one',
      target: 'variables_execution',
      joinColumn: {
        name: 'id_variables_execution',
      },
      onDelete: 'CASCADE'
    },
  },
});
