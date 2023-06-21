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
      name: 'ID_VARIABLES_LEVEL',
    },
    description: {
      type: 'varchar2',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION',
    },
  },
  relations: {
    variables: {
      type: 'many-to-one',
      target: 'variables',
      joinColumn: {
        name: 'ID_VARIABLE',
      },
      onDelete: 'CASCADE'
    },
    criticalityLevel: {
      type: 'many-to-one',
      target: 'criticality_level',
      joinColumn: {
        name: 'ID_CRITICALITY_LEVEL',
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
    {columns: [ 'variables' , 'criticalityLevel' ]}
  ]
});
