import SolidityUC from '../../application/use-cases/solidity/solidity';
import SolidityRepository from '../../infrastructure/orm/repositories/solidity';

const getSolidity = async function (httpRequest) {
  const solidityRepository = new SolidityRepository();
  const useCase = new SolidityUC({
    solidityRepository,
  });

  const solidity = await useCase.getSolidity();

  return {
    statusCode: 200,
    body: solidity,
  };
};

const saveSolidity = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const solidityRepository = new SolidityRepository();
  const useCase = new SolidityUC({
    solidityRepository,
  });

  const solidity = await useCase.saveSolidity(httpRequest.body, language);

  return {
    statusCode: 201,
    body: solidity,
  };
};

module.exports = {
  getSolidity,
  saveSolidity,
}