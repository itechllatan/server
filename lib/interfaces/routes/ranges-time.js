import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/ranges-time';

router.route('')
  .get(makeExpressCb(controller.getRangesTime))
  .post(makeExpressCb(controller.saveRangesTime));

module.exports = router;