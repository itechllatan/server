import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process'

router.route('/process')
  //.post(makeExpressCb(controller.getProcess))
  .get(makeExpressCb(controller.getProcess))
  
module.exports = router;