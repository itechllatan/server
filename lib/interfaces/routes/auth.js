import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/auth';

router.route('/sign-in')
  .post(makeExpressCb(controller.signIn));
  
module.exports = router;