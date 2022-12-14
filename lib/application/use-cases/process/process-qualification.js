import { getConnection } from "typeorm";
import ProcessQualification from "../../domain/process-qualification";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { ForbiddenError, UnauthorizedError, } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class ProcessQualificationUC {
  constructor({ processQualificationRepository }) {
    this.processQualificationRepository = processQualificationRepository;
  }
}

export default ProcessQualificationUC;
