import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/macro_process'

router.route('/:id')
  .get(makeExpressCb(controller.getMacroProcessById))
  .delete(makeExpressCb(controller.deleteMacroProcess));

router.route('/')
  .get(makeExpressCb(controller.getMacroProcess));
  
router.route('/')
  .post(makeExpressCb(controller.saveMacroProcess));

module.exports = router;