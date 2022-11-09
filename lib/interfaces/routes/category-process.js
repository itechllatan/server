import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/category-process'

router.route('/categoryProcess/')
  .get(makeExpressCb(controller.getCategoryProcess))

router.route('/categoryProcess/:id')
  .get(makeExpressCb(controller.getCategoryProcessById))

module.exports = router;