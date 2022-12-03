import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'variablesCLevelC',
  tableName: `${config.DB.PREFIX}_VARIABLESC_LEVELC`,
  columns: {
    ...baseColumns,
    id_variablesC_levelC: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
  relations: {
    variablesContinuity: {
      type: 'many-to-one',
      target: 'variables_continuity',
      joinColumn: {
        name: 'id_variables_continuity',
      },
      onDelete: 'CASCADE'
    },
    levelCriticality: {
      type: 'many-to-one',
      target: 'level_criticality',
      joinColumn: {
        name: 'id_level_criticality',
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
