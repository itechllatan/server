import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/variables';

router.route('/risk-variables')
  .get(makeExpressCb(controller.getRiskVariables))
  .post(makeExpressCb(controller.insertRiskVariables));

router.route('/variables-and-options/:type')
  .get(makeExpressCb(controller.getVariablesAndOptions));

router.route('/:id')
  .delete(makeExpressCb(controller.deleteVariables));

router.route('/:type')
  .get(makeExpressCb(controller.getVariables));

router.route('')
  .post(makeExpressCb(controller.saveVariable));

module.exports = router;