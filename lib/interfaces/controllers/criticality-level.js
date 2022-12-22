import CriticalityLevelUC from '../../application/use-cases/criticality-level/criticality-level';
import CriticalityLevelRepository from '../../infrastructure/orm/repositories/criticality-level';

const getCriticalityLevel = async function (httpRequest) {
  const criticalityLevelRepository = new CriticalityLevelRepository();
  const useCase = new CriticalityLevelUC({
    criticalityLevelRepository,
  });

  const level = await useCase.getCriticalityLevel();

  return {
    statusCode: 200,
    body: level,
  };
};

const saveCriticalityLevel = async function (httpRequest) {
  const criticalityLevelRepository = new CriticalityLevelRepository();
  const useCase = new CriticalityLevelUC({
    criticalityLevelRepository,
  });

  const level = await useCase.saveCriticalityLevel(httpRequest.body);

  return {
    statusCode: 201,
    body: level
  }
}

module.exports = {
  getCriticalityLevel,
  saveCriticalityLevel,
}