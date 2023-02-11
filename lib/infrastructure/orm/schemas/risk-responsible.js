import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'riskResponsible',
  tableName: `${config.DB.PREFIX}_RISK_RESPONSIBLES`,
  columns: {
    ...baseColumns,
    id_risk_responsible: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    responsible: {
      type: 'many-to-one',
      target: 'responsibles',
      joinColumn: {
        name: 'id_responsible',
      },
      onDelete: 'CASCADE'
    },
    risk_heat_map: {
      type: 'many-to-one',
      target: 'risk_heat_map',
      joinColumn: {
        name: 'id_risk_heat_map',
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
