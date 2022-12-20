import RangesTimeUC from '../../application/use-cases/ranges-time/ranges-time';
import RangesTimeRepository from '../../infrastructure/orm/repositories/ranges-time';

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
  getRangesTime,
  saveRangesTime,
}