import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/cause-effect-root'

router.route('')
  .get(makeExpressCb(controller.getCauseEffectRoot))
  .post(makeExpressCb(controller.saveCauseEffectRoot));

router.route('/son/:id')
  .get(makeExpressCb(controller.getCauseEffectSon));

router.route('/son')
  .post(makeExpressCb(controller.saveCauseEffectSon));

module.exports = router;