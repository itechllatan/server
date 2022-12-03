import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/general';

router.route('/frequency-risks')
  .get(makeExpressCb(controller.getFrequencyRisks));

router.route('/impact-risks')
  .get(makeExpressCb(controller.getImpactRisks));

router.route('/type-process/')
  .get(makeExpressCb(controller.getTypeProcess))

router.route('/category-process/')
  .get(makeExpressCb(controller.getCategoryProcess))

router.route('/heat-map')
  .get(makeExpressCb(controller.getHeatMap))

router.route('/unit-time')
  .get(makeExpressCb(controller.getUnitTime))

module.exports = router;