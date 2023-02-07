import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action-process'

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionProcessById))
  .delete(makeExpressCb(controller.deletePlansActionProcess));

router.route('')
  .post(makeExpressCb(controller.savePlansActionProcess));

module.exports = router;