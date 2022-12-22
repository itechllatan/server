import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'variables_level',
  tableName: `${config.DB.PREFIX}_VARIABLES_LEVEL`,
  columns: {
    ...baseColumns,
    id_variables_level: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'id_variable',
      },
      onDelete: 'CASCADE'
    },
    criticalityLevel: {
      type: 'many-to-one',
      target: 'criticality_level',
      joinColumn: {
        name: 'id_criticality_level',
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
    {columns: [ 'variables' , 'criticalityLevel' ]}
  ]
});
