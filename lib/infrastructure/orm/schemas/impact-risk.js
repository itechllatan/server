import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'impact_risk',
  tableName: `${config.DB.PREFIX}_IMPACT_RISKS`,
  columns: {
    id_impact_risk: {
      primary: true,
      type: 'int',
      generated: true,
      name: 'ID_IMPACT_RISK'
    },
    description: {
      type: 'varchar',
      length: 2000,
      name: 'DESCRIPTION'
    },
    weight: {
      type: 'number',
      name: 'WEIGHT'
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
