import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/subprocess-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getSubprocessRiskById))
  .delete(makeExpressCb(controller.deleteSubprocessRisk));

router.route('/')
  .get(makeExpressCb(controller.getSubprocessRisk))
  .post(makeExpressCb(controller.saveSubprocessRisk));

router.route('/risk/:id')
  .get(makeExpressCb(controller.getRiskSubprocessById));

module.exports = router;