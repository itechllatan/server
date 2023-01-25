import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/menu';

router.route('/')
  .get(makeExpressCb(controller.getMenu));

router.route('/validation')
  .post(makeExpressCb(controller.validateRoute))
  
module.exports = router;