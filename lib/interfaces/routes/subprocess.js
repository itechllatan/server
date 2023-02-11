import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/subprocess'

router.route('/:id')
  .get(makeExpressCb(controller.getSubprocessById))
  .delete(makeExpressCb(controller.deleteSubprocess));

router.route('/')
  .get(makeExpressCb(controller.getSubprocess));
  
router.route('/')
  .post(makeExpressCb(controller.saveSubprocess));

router.route('/byProcess/:id')
  .get(makeExpressCb(controller.getSubprocessByProcess));

module.exports = router;