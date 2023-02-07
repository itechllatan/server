import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/subprocess-responsible'

router.route('/:id')
  .get(makeExpressCb(controller.getSubprocessResponsibleById))
  .delete(makeExpressCb(controller.deleteSubprocessResponsible));

router.route('')
  .post(makeExpressCb(controller.saveSubprocessResponsible));

module.exports = router;