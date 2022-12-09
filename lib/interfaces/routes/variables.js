import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/variables';

router.route('/risk-variables')
  .get(makeExpressCb(controller.getRiskVariables));

module.exports = router;