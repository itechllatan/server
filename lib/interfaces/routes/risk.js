import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk';

router.route('/:id')
  .get(makeExpressCb(controller.getRiskById))

router.route('/')
  .get(makeExpressCb(controller.getRisks));
  
router.route('/')
  .post(makeExpressCb(controller.insertRisk));
  
module.exports = router;