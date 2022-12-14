import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/controls-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getControlsRiskById))

router.route('')
  .post(makeExpressCb(controller.saveControlsRisk));

module.exports = router;