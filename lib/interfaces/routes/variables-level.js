import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/variables-level';

router.route('/:id')
  .get(makeExpressCb(controller.getVariablesLevelById));

router.route('')
  .post(makeExpressCb(controller.saveVariablesLevel));

module.exports = router;