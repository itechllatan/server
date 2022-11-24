import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getProcessRiskByProcess))

router.route('/')
  .get(makeExpressCb(controller.getProcessRisk))
  .post(makeExpressCb(controller.saveProcessRisk))

module.exports = router;