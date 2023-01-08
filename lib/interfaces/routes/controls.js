import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/controls'

router.route('')
  .get(makeExpressCb(controller.getControls))
  .post(makeExpressCb(controller.saveControls));

router.route('/text/:text')
  .get(makeExpressCb(controller.getControlByText));

router.route('/control-variables/:id&:type')
  .get(makeExpressCb(controller.getControlVariableOptions));

router.route('/control-variables')
  .post(makeExpressCb(controller.saveControlVariableOptions));

router.route('/:id')
  .get(makeExpressCb(controller.getControlsById));

module.exports = router;