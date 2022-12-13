import LevelCriticalityUC from '../../application/use-cases/qualification-process-criticality/level-criticality';
import LevelCriticalityRepository from '../../infrastructure/orm/repositories/level-criticality';
import LevelCriticalityColorUC from '../../application/use-cases/qualification-process-criticality/level-criticality-color';
import LevelCriticalityColorRepository from '../../infrastructure/orm/repositories/level-criticality-color';

import RangesTimeUC from '../../application/use-cases/qualification-process-criticality/ranges-time';
import RangesTimeRepository from '../../infrastructure/orm/repositories/ranges-time';


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
const getLevelCriticalityColor = async function (httpRequest) {
  const levelCriticalityColorRepository = new LevelCriticalityColorRepository();
  const useCase = new LevelCriticalityColorUC({
    levelCriticalityColorRepository,
  });
  const color = await useCase.getLevelCriticalityColor()
  //const color = await levelCriticalityColorRepository.getLevelCriticalityColor()
  return {
    statusCode: 200,
    body: color,
  };
};

const getRangesTime = async function (httpRequest) {
  const rangesTimeRepository = new RangesTimeRepository();
  const useCase = new RangesTimeUC({
    rangesTimeRepository,
  });

  const range = await useCase.getRangesTime();

  return {
    statusCode: 200,
    body: range,
  };
};
const saveRangesTime = async function (httpRequest) {
  console.log('httpRequest.body',httpRequest.body)
  const rangesTimeRepository = new RangesTimeRepository();
  const useCase = new RangesTimeUC({
    rangesTimeRepository,
  });

  const range = await useCase.saveRangesTime(httpRequest.body);

  return {
    statusCode: 201,
    body: range
  }
}

module.exports = {
  getLevelCriticality,
  saveLevelCriticality,
  getLevelCriticalityColor,
  getRangesTime,
  saveRangesTime,
}