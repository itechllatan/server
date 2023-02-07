import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action-subprocess'

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionSubprocessById))
  .delete(makeExpressCb(controller.deletePlansActionSubprocess));

router.route('')
  .post(makeExpressCb(controller.savePlansActionSubprocess));

module.exports = router;