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
      name: 'ID_CAUSE_EFFECT'
    },
    name: {
      type: 'varchar',
      name: 'NAME'
    },
    description: {
      type: 'varchar',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION'
    },
  },
  relations: {
    cause_effect_son: {
      type: 'many-to-one',
      target: 'cause_effect_son',
      joinColumn: {
        name: 'ID_CAUSE_EFFECT_SON',
      },
      onDelete: 'CASCADE'
    },
  },
});
