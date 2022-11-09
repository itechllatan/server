import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/general';

router.route('/frequency-risks')
  .get(makeExpressCb(controller.getFrequencyRisks));
  
router.route('/impact-risks')
  .get(makeExpressCb(controller.getImpactRisks));

  module.exports = router;