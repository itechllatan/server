import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls_var_design',
  tableName: `${config.DB.PREFIX}_CONTROLS_VAR_DESIGN`,
  columns: {
    ...baseColumns,
    id_controls_var_design: {
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
    variablesDesign: {
      type: 'many-to-one',
      target: 'variables_design',
      joinColumn: {
        name: 'id_variables_design',
      },
      onDelete: 'CASCADE'
    },
    variablesDesignOptions: {
      type: 'many-to-one',
      target: 'variables_design_options',
      joinColumn: {
        name: 'id_variables_design_options',
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
