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
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
  },
  relations: {
    frequencyRisk: {
      type: 'many-to-one',
      target: 'frequency_risk',
      joinColumn: {
        name: 'id_frequency_risk',
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
    impactRiskRating: {
      type: 'one-to-many',
      target: 'impact_risk_rating',
      inverseSide: 'risk'
    }
  },
});
