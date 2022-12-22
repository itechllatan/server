import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/criticality-level';

router.route('')
  .get(makeExpressCb(controller.getCriticalityLevel))
  .post(makeExpressCb(controller.saveCriticalityLevel));

module.exports = router;