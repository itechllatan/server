import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process'

router.route('/text/:text')
  .get(makeExpressCb(controller.getProcessText));

router.route('/:id')
  .get(makeExpressCb(controller.getProcessById))
  .delete(makeExpressCb(controller.deleteProcess));

router.route('/')
  .get(makeExpressCb(controller.getProcess))
  .post(makeExpressCb(controller.saveProcess))

router.route('/byMacro/:id')
  .get(makeExpressCb(controller.getProcessByMacro))

router.route('/socio/:id')
  .get(makeExpressCb(controller.getProcessSocio))

router.route('/qualification/:id&:type')
  .get(makeExpressCb(controller.getProcessQualification))

module.exports = router;