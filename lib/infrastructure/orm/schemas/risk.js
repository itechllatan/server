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
    reputationalRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'reputational_risk',
      },
      onDelete: 'CASCADE'
    },
    legalRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'legal_risk',
      },
      onDelete: 'CASCADE'
    },
    operationalRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'operational_risk',
      },
      onDelete: 'CASCADE'
    },
    contagionRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'contagion_risk',
      },
      onDelete: 'CASCADE'
    },
  },
});
