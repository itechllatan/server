import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/plans-action-macroprocess'

router.route('/:id')
  .get(makeExpressCb(controller.getPlansActionMacroProcessById))
  .delete(makeExpressCb(controller.deletePlansActionMacroProcess));

router.route('')
  .post(makeExpressCb(controller.savePlansActionMacroProcess));

module.exports = router;