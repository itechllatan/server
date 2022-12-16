import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/solidity';

router.route('')
  .get(makeExpressCb(controller.getSolidity));

module.exports = router;