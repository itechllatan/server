
import FrequencyRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRepository from '../../infrastructure/orm/repositories/impact-risk';
import General from '../../application/use-cases/support/general'

const getFrequencyRisks = async function (httpRequest) {
  const frequencyRepository = new FrequencyRepository();
  const useCase = new General({
    frequencyRepository,
  });

  const frequency = await useCase.getFrequencyRisks();
  
  return {
    statusCode: 200,
    body: frequency,
  };
};

const getImpactRisks = async function (httpRequest) {
    const impactRepository = new ImpactRepository();
    const useCase = new General({
        impactRepository,
    });
  
    const impact = await useCase.getImpactRisks();
    
    return {
      statusCode: 200,
      body: impact,
    };
  };


module.exports = {
    getFrequencyRisks,
    getImpactRisks,
}