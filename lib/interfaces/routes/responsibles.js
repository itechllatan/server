import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/responsibles'

router.route('')
  .get(makeExpressCb(controller.getResponsibles))
  .post(makeExpressCb(controller.saveResponsibles));

router.route('/:id')
  .get(makeExpressCb(controller.getResponsiblesById));

module.exports = router;