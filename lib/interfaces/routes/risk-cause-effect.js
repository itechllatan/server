import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/risk-cause-effect'

router.route('/:id')
  .delete(makeExpressCb(controller.deleteRiskCauseEffect));

module.exports = router;