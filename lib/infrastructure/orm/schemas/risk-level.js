import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'risk_level',
  tableName: `${config.DB.PREFIX}_RISK_LEVEL`,
  columns: {
    id_risk_level: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_RISK_LEVEL',
    },
    name: {
      type: 'varchar2',
      name: 'NAME',
    },
    description: {
      type: 'varchar2',
      length: 2000,
      name: 'DESCRIPTION',
    },
    color: {
      type: 'varchar2',
      name: 'COLOR',
    },
  },
  relations: {
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'ID_HEAT_MAP',
        },
        onDelete: 'CASCADE'
    },
  },
});
