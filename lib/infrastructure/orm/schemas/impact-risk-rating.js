import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'impact_risk_rating',
  tableName: `${config.DB.PREFIX}_IMPACT_RISK_RATING`,
  columns: {
    id_impact_risk_rating: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    impactRisk: {
      type: 'many-to-one',
      target: 'impact_risk',
      joinColumn: {
        name: 'id_impact_risk',
      },
      onDelete: 'CASCADE'
    },
    riskType: {
        type: 'many-to-one',
        target: 'risk_type',
        joinColumn: {
            name: 'id_risk_type'
        },
        onDelete: 'CASCADE'
    },
    risk: {
        type: 'many-to-one',
        target: 'risk',
        joinColumn: {
            name: 'id_risk'
        },
        onDelete: 'CASCADE'
    }
  },
});
