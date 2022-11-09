import Risk from '../../application/use-cases/risk/risk';
import RiskRepository from '../../infrastructure/orm/repositories/risk';

const getRisks = async function (httpRequest) {
  const riskRepository = new RiskRepository();
  const useCase = new Risk({
    riskRepository,
  });

  const risk = await useCase.getRisks();
  
  return {
    statusCode: 200,
    body: risk,
  };
};

const insertRisk = async function (httpRequest){
    const riskRepository = new RiskRepository();
    const useCase = new Risk({
        riskRepository,
    });

    const risk = await useCase.insertRisk(httpRequest.body);

    return {
        statusCode: 201,
        body: risk
    }
}
module.exports = {
    getRisks,
    insertRisk
}