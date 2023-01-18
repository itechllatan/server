import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/users'

router.route('')
  .get(makeExpressCb(controller.getUsers))
  .post(makeExpressCb(controller.saveUsers));

module.exports = router;