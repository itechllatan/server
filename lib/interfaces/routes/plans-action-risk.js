import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action-risk'

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionRiskById))
  .delete(makeExpressCb(controller.deletePlansActionRisk));

router.route('')
  .post(makeExpressCb(controller.savePlansActionRisk));

module.exports = router;