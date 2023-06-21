import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'risk',
  tableName: `${config.DB.PREFIX}_RISKS`,
  columns: {
    ...baseColumns,
    id_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_RISK',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION',
    },
    reference: {
      type: 'varchar2',
      nullable: true,
      name: 'REFERENCE',
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE'
    },
    risk_heatMap: {
      type: 'one-to-many',
      target: 'risk_heat_map',
      inverseSide: 'risk',
    },
  },
});
