import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/matrix';

router.route('/:id')
  .get(makeExpressCb(controller.getMatrixByHeatMap));

router.route('/default')
  .post(makeExpressCb(controller.createDefaultMatrix));

module.exports = router;