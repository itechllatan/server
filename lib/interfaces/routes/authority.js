import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/authority'

router.route('')
  .get(makeExpressCb(controller.getAuthority))
  .post(makeExpressCb(controller.saveAuthority));

module.exports = router;