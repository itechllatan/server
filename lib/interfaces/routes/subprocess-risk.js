import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/subprocess-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getSubprocessRiskById))

router.route('/')
  .get(makeExpressCb(controller.getSubprocessRisk))
  .post(makeExpressCb(controller.saveSubprocessRisk))

module.exports = router;