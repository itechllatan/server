import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/time_ranges';

router.route('')
  .get(makeExpressCb(controller.getTimeRanges))
  .post(makeExpressCb(controller.saveTimeRanges));

module.exports = router;