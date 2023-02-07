import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action-controls'

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionControlsById))
  .delete(makeExpressCb(controller.deletePlansActionControls));

router.route('')
  .post(makeExpressCb(controller.savePlansActionControls));

module.exports = router;