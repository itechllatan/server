import { EntitySchema } from 'typeorm';
import config from '../../config/env';

module.exports = new EntitySchema({
  name: 'risk_cause_effect',
  tableName: `${config.DB.PREFIX}_RISK_CAUSE_EFFECT`,
  columns: {
    id_risk_cause_effect: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    cause_effect: {
      type: 'many-to-one',
      target: 'cause_effect',
      joinColumn: {
        name: 'id_cause_effect',
      },
      onDelete: 'CASCADE'
    },
    risk: {
      type: 'many-to-one',
      target: 'risk',
      joinColumn: {
        name: 'id_risk',
      },
      onDelete: 'CASCADE'
    },
  },
  uniques: [
    {columns: [ 'cause_effect' , 'risk' ]}
  ]
});
