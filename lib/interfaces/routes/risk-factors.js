import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk-factors'

router.route('/master')
  .get(makeExpressCb(controller.getRiskFactorsMaster))
  .post(makeExpressCb(controller.saveRiskFactorsMaster));

router.route('/:id')
  .delete(makeExpressCb(controller.deleteRiskFactorsMaster));

module.exports = router;