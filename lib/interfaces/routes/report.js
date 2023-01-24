import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/report'

router.route('')
  .get(makeExpressCb(controller.getReport));

module.exports = router;