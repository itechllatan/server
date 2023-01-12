import { requiredParam } from '../../infrastructure/helpers/validations';

class PlansAction {
  constructor({
    id_plans_action,
    name = requiredParam('name', language),
    description = requiredParam('description', language),
    dateStart = requiredParam('dateStart', language),
    dateFinish = requiredParam('dateFinish', language),
    responsibles = requiredParam('responsibles', language),
    user,
    language,
  }) {
    this.id_plans_action = id_plans_action;
    this.name = name;
    this.description = description;
    this.dateStart = dateStart;
    this.dateFinish = dateFinish;
    this.responsibles = responsibles;
    this.user = user;
  }
}

export default PlansAction;