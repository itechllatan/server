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
      name: 'ID_CONTROLS'
    },
    name: {
      type: 'varchar',
      name: 'NAME'
    },
    qualification_design: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'QUALIFICATION_DESIGN'
    },
    qualification_execution: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'QUALIFICATION_EXECUTION'
    },
    final_design: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'FINAL_DESIGN'
    },
    final_execution: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'FINAL_EXECUTION'
    },
    description: {
      type: 'varchar',
      nullable: true,
      length: 2000,
      name: 'DESCRIPTION'
    },
    value_solidity: {
      type: 'decimal',
      precision: '18,4',
      default: 0,
      name: 'VALUE_SOLIDITY'
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
        name: 'ID_SOLIDITY_GENERAL',
      },
      onDelete: 'CASCADE'
    },
    solidityDesign: {
      type: 'many-to-one',
      target: 'solidity',
      joinColumn: {
        name: 'ID_SOLIDITY_DESIGN',
      },
      onDelete: 'CASCADE'
    },
    solidityExecution: {
      type: 'many-to-one',
      target: 'solidity',
      joinColumn: {
        name: 'ID_SOLIDITY_EXECUTION',
      },
      onDelete: 'CASCADE'
    },
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'ID_USER',
      },
      onDelete: 'CASCADE'
    },
  },
});
