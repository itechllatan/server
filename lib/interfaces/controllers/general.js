import FrequencyRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRepository from '../../infrastructure/orm/repositories/impact-risk';
import TypeProcessRepository from '../../infrastructure/orm/repositories/type-process'
import CategoryProcessRepository from '../../infrastructure/orm/repositories/category-process'
import HeatMapRepository from '../../infrastructure/orm/repositories/heat-map'
import UnitTimeRepository from '../../infrastructure/orm/repositories/unit-time';

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

const getTypeProcess = async function (httpRequest) {
  const typeProcessRepository = new TypeProcessRepository();
  const useCase = new General({
    typeProcessRepository,
  });

  const typeProcess = await useCase.getTypeProcess();
  return {
    statusCode: 200,
    body: typeProcess,
  };
};

const getCategoryProcess = async function (httpRequest) {
  const categoryProcessRepository = new CategoryProcessRepository();
  const useCase = new General({
    categoryProcessRepository,
  });

  const categoryProcess = await useCase.getCategoryProcess();

  return {
    statusCode: 200,
    body: categoryProcess,
  };
};

const getHeatMap = async function (httpRequest) {
  const heatMapRepository = new HeatMapRepository();
  const useCase = new General({
    heatMapRepository,
  });

  const heatMaps = await useCase.getHeatMap();

  return {
    statusCode: 200,
    body: heatMaps
  }
}

const getUnitTime = async function (httpRequest) {
  const unitTimeRepository = new UnitTimeRepository();
  const useCase = new General({
    unitTimeRepository,
  });

  const unit = await useCase.getUnitTime();

  return {
    statusCode: 200,
    body: unit,
  };
};

module.exports = {
  getFrequencyRisks,
  getImpactRisks,
  getTypeProcess,
  getCategoryProcess,
  getHeatMap,
  getUnitTime
}