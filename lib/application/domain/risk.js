
import {
    requiredParam
  } from '../../infrastructure/helpers/validations';

import ImpactRiskRating from './impact-risk-rating';
import FrequencyRisk from "./frequency-risk"
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
      impactRiskRating
    }) {
      this.id_risk = id_risk;
      this.name = name;
      this.description = description;
      this.created_at = created_at;
      this.deleted_at = deleted_at;
      this.update_at = update_at;
      this.frequencyRisk = new FrequencyRisk({ validators: {}, language, ...frequencyRisk });
      this.impactRiskRating = impactRiskRating?.map(
        rating => new ImpactRiskRating({validators: {}, language, ...rating})
      ) 
      this.user = user;
    }
  }
  
  export default Risk;