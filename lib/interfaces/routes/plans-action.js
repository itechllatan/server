import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action';

router.route('')
  .get(makeExpressCb(controller.getPlansAction))
  .post(makeExpressCb(controller.savePlansAction));

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionById))
  .delete(makeExpressCb(controller.deletePlansAction));

module.exports = router;