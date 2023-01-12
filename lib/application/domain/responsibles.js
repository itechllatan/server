import { requiredParam } from '../../infrastructure/helpers/validations'
class Responsibles {
  constructor({
    id_responsibles,
    document_number = requiredParam('document_number', language),
    names = requiredParam('names', language),
    last_name_1 = requiredParam('last_name_1', language),
    last_name_2 = requiredParam('last_name_2', language),
    mail = requiredParam('mail', language),
    user,
    language
  }) {
    this.id_responsibles = id_responsibles;
    this.document_number = document_number;
    this.names = names;
    this.last_name_1 = last_name_1;
    this.last_name_2 = last_name_2;
    this.mail = mail;
    this.user = user;
  }
}

export default Responsibles;