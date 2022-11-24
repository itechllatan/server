import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/macroprocess-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getMacroprocessRiskById))

router.route('/')
  .get(makeExpressCb(controller.getMacroprocessRisk))
  .post(makeExpressCb(controller.saveMacroprocessRisk))

module.exports = router;