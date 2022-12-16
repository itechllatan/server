import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/weight-assignment'

router.route('')
  .get(makeExpressCb(controller.getWeightAssignment))
  .post(makeExpressCb(controller.saveWeightAssignment));

router.route('/:id')
  .get(makeExpressCb(controller.getWeightAssignmentById));

module.exports = router;