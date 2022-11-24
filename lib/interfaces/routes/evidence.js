import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/evidence'

router.route('/')
.post(makeExpressCb(controller.sendEvidence))

module.exports = router;