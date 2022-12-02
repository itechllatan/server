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
    },
    description: {
      type: 'varchar',
    },
    weight: {
      type: 'number',
    },
  },
  relations: {
    heatMap: {
        type: 'many-to-one',
        target: 'heatMap',
        joinColumn: {
            name: 'id_heat_map',
        },
        onDelete: 'CASCADE'
    },
  },
});
