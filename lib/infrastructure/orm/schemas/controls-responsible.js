import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls_responsible',
  tableName: `${config.DB.PREFIX}_CONTROLS_RESPONSIBLE`,
  columns: {
    ...baseColumns,
    id_controls_responsible: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_CONTROLS_RESPONSIBLE'
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
    responsibles: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'ID_RESPONSIBLES',
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
    deleted_by: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'DELETED_BY',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'controls' , 'responsibles' ]}
  ]
});
