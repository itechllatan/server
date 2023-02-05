import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'cause_effect',
  tableName: `${config.DB.PREFIX}_CAUSE_EFFECT`,
  columns: {
    ...baseColumns,
    id_cause_effect: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
      nullable: true
    },
  },
  relations: {
    cause_effect_son: {
      type: 'many-to-one',
      target: 'cause_effect_son',
      joinColumn: {
        name: 'id_cause_effect_son',
      },
      onDelete: 'CASCADE'
    },
  },
});
