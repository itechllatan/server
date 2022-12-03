import LevelCriticalityUC from '../../application/use-cases/qualification-process-criticality/level-criticality';
import LevelCriticalityRepository from '../../infrastructure/orm/repositories/level-criticality';
import LevelCriticalityColorUC from '../../application/use-cases/qualification-process-criticality/level-criticality-color';
import LevelCriticalityColorRepository from '../../infrastructure/orm/repositories/level-criticality-color';

import VariablesContinuityUC from '../../application/use-cases/qualification-process-criticality/variables-continuity';
import VariablesContinuityRepository from '../../infrastructure/orm/repositories/variables-continuity';

import VariablesCLevelCUC from '../../application/use-cases/qualification-process-criticality/variablesCLevelC';
import VariablesCLevelCRepository from '../../infrastructure/orm/repositories/variablesCLevelC';

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
const getVariablesCLevelC = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const variablesCLevelCRepository = new VariablesCLevelCRepository();
  const useCase = new VariablesCLevelCUC({
    variablesCLevelCRepository,
  });

  //console.log('id',id)
  const data = await useCase.getVariablesCLevelCById({ id });
  //const data = await variablesCLevelCRepository.getVariablesCLevelC_2({ id });
  //console.log('data',data)
  return {
    statusCode: 200,
    body: data,
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
  getVariablesContinuity,
  saveVariablesContinuity,
  getVariablesCLevelC,
  getRangesTime,
  saveRangesTime,
}