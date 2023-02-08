import SolidityUC from '../../application/use-cases/solidity/solidity';
import SolidityRepository from '../../infrastructure/orm/repositories/solidity';

const getSolidity = async function (httpRequest) {
  const solidityRepository = new SolidityRepository();
  const useCase = new SolidityUC({ solidityRepository, });

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

  const solidity = await useCase.saveSolidity(httpRequest.body, httpRequest.user, language);

  return {
    statusCode: 201,
    body: solidity,
  };
};

const deleteSolidity = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const solidityRepository = new SolidityRepository();
  const useCase = new SolidityUC({ solidityRepository, });
  const deleteElemet = await useCase.deleteSolidity(id, httpRequest.user);

  if (deleteElemet.raw === 0) {
    return {
      statusCode: 400,
      body: { message: 'No se pudo eliminar la la solidez' }
    };
  } else {
    return {
      statusCode: 200,
      body: { message: 'Solidez eliminada' }
    };
  }
};

module.exports = {
  getSolidity,
  saveSolidity,
  deleteSolidity
}