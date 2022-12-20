import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/level-criticality';

router.route('')
  .get(makeExpressCb(controller.getLevelCriticality))
  .post(makeExpressCb(controller.saveLevelCriticality));

module.exports = router;