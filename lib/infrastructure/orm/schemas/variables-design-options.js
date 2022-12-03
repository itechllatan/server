import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'variables_design_options',
  tableName: `${config.DB.PREFIX}_VARIABLES_DESIGN_OPTIONS`,
  columns: {
    id_variables_design_options: {
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
    variablesDesign: {
      type: 'many-to-one',
      target: 'variables_design',
      joinColumn: {
        name: 'id_variables_design',
      },
      onDelete: 'CASCADE'
    },
  },
});
