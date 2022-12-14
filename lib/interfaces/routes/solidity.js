import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/solidity';

router.route('')
  .get(makeExpressCb(controller.getSolidity))
  .post(makeExpressCb(controller.saveSolidity));

module.exports = router;