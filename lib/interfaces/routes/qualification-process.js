import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/qualification-process';

router.route('/level-criticality')
  .get(makeExpressCb(controller.getLevelCriticality))
  .post(makeExpressCb(controller.saveLevelCriticality));
router.route('/level-criticality-color')
  .get(makeExpressCb(controller.getLevelCriticalityColor));

router.route('/variables-continuity')
  .get(makeExpressCb(controller.getVariablesContinuity))
  .post(makeExpressCb(controller.saveVariablesContinuity));

router.route('/variablesC-LevelC/:id')
  .get(makeExpressCb(controller.getVariablesCLevelC))

router.route('/ranges-time')
  .get(makeExpressCb(controller.getRangesTime))
  .post(makeExpressCb(controller.saveRangesTime));

module.exports = router;