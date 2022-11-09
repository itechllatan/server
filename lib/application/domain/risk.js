
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

import FrequencyRisk from "./frequency-risk"
import ImpactRisk from "./impact-risk"
class Risk {
    constructor({
      id_risk,
      name = requiredParam('name', language),
      description = requiredParam('description', language),
      created_at,
      deleted_at,
      update_at,
      frequencyRisk = requiredParam('frequencyRisk', language),
      user,
      language,
      reputationalRisk,
      legalRisk,
      operationalRisk,
      contagionRisk
    }) {
      this.id_risk = id_risk;
      this.name = name;
      this.description = description;
      this.created_at = created_at;
      this.deleted_at = deleted_at;
      this.update_at = update_at;
      this.frequencyRisk = new FrequencyRisk({ validators: {}, language, ...frequencyRisk });
      this.reputationalRisk = new ImpactRisk({ validators: {}, language, ...reputationalRisk });
      this.legalRisk = new ImpactRisk({ validators: {}, language, ...legalRisk });
      this.operationalRisk = new ImpactRisk({ validators: {}, language, ...operationalRisk });
      this.contagionRisk = new ImpactRisk({ validators: {}, language, ...contagionRisk });
      this.user = user;
    }
  }
  
  export default Risk;