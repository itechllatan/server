import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/controls-responsible'

router.route('/:id')
  .get(makeExpressCb(controller.getControlsResponsibleById))
  .delete(makeExpressCb(controller.deleteControlsResponsible));

router.route('')
  .post(makeExpressCb(controller.saveControlsResponsible));

module.exports = router;