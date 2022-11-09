import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process'

router.route('/process/')
  .get(makeExpressCb(controller.getProcess))

router.route('/process/:id')
  .get(makeExpressCb(controller.getProcessById))

router.route('/process/')
  .post(makeExpressCb(controller.saveProcess))

module.exports = router;