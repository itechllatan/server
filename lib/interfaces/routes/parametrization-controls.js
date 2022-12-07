import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/parametrization-controls';

router.route('/variables-design')
  .get(makeExpressCb(controller.getVariablesDesign));

router.route('/variables-execution')
  .get(makeExpressCb(controller.getVariablesExecution));

router.route('/solidity')
  .get(makeExpressCb(controller.getSolidity));

module.exports = router;