import TimeRangesUC from '../../application/use-cases/time-ranges/time_ranges';
import TimeRangesRepository from '../../infrastructure/orm/repositories/time-ranges';

const getTimeRanges = async function (httpRequest) {
  const timeRangesRepository = new TimeRangesRepository();
  const useCase = new TimeRangesUC({ timeRangesRepository, });

  const range = await useCase.getTimeRanges();

  return {
    statusCode: 200,
    body: range,
  };
};

const saveTimeRanges = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const timeRangesRepository = new TimeRangesRepository();
  const useCase = new TimeRangesUC({ timeRangesRepository, });

  const timeRanges = await useCase.saveTimeRanges(httpRequest.body, language);

  return {
    statusCode: 201,
    body: timeRanges,
  };
}

module.exports = {
  getTimeRanges,
  saveTimeRanges,
}