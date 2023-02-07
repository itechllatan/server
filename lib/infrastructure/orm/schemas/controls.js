import { EntitySchema } from 'typeorm';
import config from '../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'controls',
  tableName: `${config.DB.PREFIX}_CONTROLS`,
  columns: {
    ...baseColumns,
    id_controls: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    qualification_design: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
    qualification_execution: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
    final_design: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
    final_execution: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
    description: {
      type: 'varchar',
      nullable: true,
      length: 2000
    },
    value_solidity: {
      type: 'decimal',
      precision: '18,4',
      default: 0
    },
  },
  relations: {
    controlsVariables: {
      type: 'one-to-many',
      target: 'controls_variables',
      inverseSide: 'controls'
    },
    solidityGeneral: {
      type: 'many-to-one',
      target: 'solidity',
      joinColumn: {
        name: 'id_solidity_general',
      },
      onDelete: 'CASCADE'
    },
    solidityDesign: {
      type: 'many-to-one',
      target: 'solidity',
      joinColumn: {
        name: 'id_solidity_design',
      },
      onDelete: 'CASCADE'
    },
    solidityExecution: {
      type: 'many-to-one',
      target: 'solidity',
      joinColumn: {
        name: 'id_solidity_execution',
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
