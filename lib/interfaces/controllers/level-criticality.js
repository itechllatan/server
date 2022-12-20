import LevelCriticalityUC from '../../application/use-cases/level-criticality/level-criticality';
import LevelCriticalityRepository from '../../infrastructure/orm/repositories/level-criticality';

const getLevelCriticality = async function (httpRequest) {
  const levelCriticalityRepository = new LevelCriticalityRepository();
  const useCase = new LevelCriticalityUC({
    levelCriticalityRepository,
  });

  const level = await useCase.getLevelCriticality();

  return {
    statusCode: 200,
    body: level,
  };
};

const saveLevelCriticality = async function (httpRequest) {
  const levelCriticalityRepository = new LevelCriticalityRepository();
  const useCase = new LevelCriticalityUC({
    levelCriticalityRepository,
  });

  const level = await useCase.saveLevelCriticality(httpRequest.body);

  return {
    statusCode: 201,
    body: level
  }
}

module.exports = {
  getLevelCriticality,
  saveLevelCriticality,
}