import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk-factor-risk'

router.route('/')
  .post(makeExpressCb(controller.saveRiskFactorRisk))

router.route('/:id')
  .delete(makeExpressCb(controller.deleteRiskFactorRisk))

router.route('/risk/:id')
  .get(makeExpressCb(controller.getRiskFactorByRiskHeatMap));

module.exports = router;