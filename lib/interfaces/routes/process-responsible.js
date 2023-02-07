import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/process-responsible'

router.route('/:id')
  .get(makeExpressCb(controller.getProcessResponsibleById))
  .delete(makeExpressCb(controller.deleteProcessResponsible));

router.route('')
  .post(makeExpressCb(controller.saveProcessResponsible));

module.exports = router;