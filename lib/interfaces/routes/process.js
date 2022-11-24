import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process'

router.route('/:id')
  .get(makeExpressCb(controller.getProcessById))

router.route('/')
  .get(makeExpressCb(controller.getProcess))
  .post(makeExpressCb(controller.saveProcess))

router.route('/byMacro/:id')
  .get(makeExpressCb(controller.getProcessByMacro))

router.route('/socio/:id')
  .get(makeExpressCb(controller.getProcessSocio))

module.exports = router;