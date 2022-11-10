import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process'

router.route('/:id')
  .get(makeExpressCb(controller.getProcessById))

router.route('/')
  .get(makeExpressCb(controller.getProcess))
  
router.route('/')
  .post(makeExpressCb(controller.saveProcess))

module.exports = router;