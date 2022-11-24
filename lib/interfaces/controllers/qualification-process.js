import LevelCriticalityUC from '../../application/use-cases/qualification-process-criticality/level-criticality';
import LevelCriticalityRepository from '../../infrastructure/orm/repositories/level-criticality';
import LevelCriticalityColorUC from '../../application/use-cases/qualification-process-criticality/level-criticality-color';
import LevelCriticalityColorRepository from '../../infrastructure/orm/repositories/level-criticality-color';


import RangesTimeUC from '../../application/use-cases/qualification-process-criticality/ranges-time';
import RangesTimeRepository from '../../infrastructure/orm/repositories/ranges-time';


import VariablesContinuityUC from '../../application/use-cases/qualification-process-criticality/variables-continuity';
import VariablesContinuityRepository from '../../infrastructure/orm/repositories/variables-continuity';

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


const getVariablesContinuity = async function (httpRequest) {
  const variablesContinuityRepository = new VariablesContinuityRepository();
  const useCase = new VariablesContinuityUC({
    variablesContinuityRepository,
  });

  const variable = await useCase.getVariablesContinuity();

  return {
    statusCode: 200,
    body: variable,
  };
};
const saveVariablesContinuity = async function (httpRequest) {
  const variablesContinuityRepository = new VariablesContinuityRepository();
  const useCase = new VariablesContinuityUC({
    variablesContinuityRepository,
  });

  const variableCon = await useCase.saveVariablesContinuity(httpRequest.body);

  return {
    statusCode: 201,
    body: variableCon
  }
}

module.exports = {
  getLevelCriticality,
  saveLevelCriticality,
  getLevelCriticalityColor,
  getRangesTime,
  saveRangesTime,
  getVariablesContinuity,
  saveVariablesContinuity,
}