import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk-responsible'

router.route('/')
  .post(makeExpressCb(controller.saveRiskResponsible))

router.route('/risk/:id')
  .get(makeExpressCb(controller.getResponsibleByRiskHeatMap));

module.exports = router;