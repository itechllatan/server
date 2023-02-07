import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getProcessRiskByProcess))
  .delete(makeExpressCb(controller.deleteProcessRisk));

router.route('/')
  .get(makeExpressCb(controller.getProcessRisk))
  .post(makeExpressCb(controller.saveProcessRisk))

router.route('/risk/:id')
  .get(makeExpressCb(controller.getRiskProcessByProcess));

module.exports = router;