import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk-heat-map';

router.route('/:id/dashboard')
  .get(makeExpressCb(controller.getDashboardByRiskHeatMap))

module.exports = router;