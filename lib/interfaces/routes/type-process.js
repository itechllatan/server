import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/type-process'

router.route('/typeProcess/')
  .get(makeExpressCb(controller.getTypeProcess))

router.route('/typeProcess/:id')
  .get(makeExpressCb(controller.getTypeProcessById))

module.exports = router;