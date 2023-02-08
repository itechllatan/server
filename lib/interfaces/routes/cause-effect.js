import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/cause-effect'

router.route('')
  .get(makeExpressCb(controller.getCauseEffect))
  .post(makeExpressCb(controller.saveCauseEffect));

router.route('/:id')
  .delete(makeExpressCb(controller.deleteCauseEffect));

router.route('/risk/:id')
  .get(makeExpressCb(controller.getRiskCauseEffect))

router.route('/risk')
  .post(makeExpressCb(controller.saveRiskCauseEffect));

module.exports = router;