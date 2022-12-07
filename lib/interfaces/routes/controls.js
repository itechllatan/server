import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/controls'

router.route('')
  .get(makeExpressCb(controller.getControls)) //ok
  .post(makeExpressCb(controller.saveControls)); //ok

router.route('/control-varExecution/:id')
  .get(makeExpressCb(controller.getControlVarExecutionOptions)); //ok

router.route('/control-varExecution')
  .post(makeExpressCb(controller.saveControlVarExecutionOptions));

router.route('/control-varDesign/:id')
  .get(makeExpressCb(controller.getControlVarDesignOptions)); //ok

router.route('/control-varDesign')
  .post(makeExpressCb(controller.saveControlVarDesignOptions)); //ok

router.route('/:id')
  .get(makeExpressCb(controller.getControlsById)); //ok


module.exports = router;