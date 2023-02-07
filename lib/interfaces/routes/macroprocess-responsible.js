import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/macroprocess-responsible'

router.route('/:id')
  .get(makeExpressCb(controller.getMacroprocessResponsibleById))
  .delete(makeExpressCb(controller.deleteMacroprocessResponsible));

router.route('')
  .post(makeExpressCb(controller.saveMacroprocessResponsible));

module.exports = router;