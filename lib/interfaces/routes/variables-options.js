import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/variables-options';

router.route('')
  .get(makeExpressCb(controller.getVariablesOptions));

module.exports = router;