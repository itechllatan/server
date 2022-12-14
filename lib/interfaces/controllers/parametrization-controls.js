import SolidityUC from '../../application/use-cases/parametrization-controls/solidity';
import SolidityRepository from '../../infrastructure/orm/repositories/solidity';


/*const getVariablesDesign = async function (httpRequest) {
  const variablesDesignRepository = new VariablesDesignRepository();
  const variablesDesignOptionsRepository = new VariablesDesignOptionsRepository();
  const useCase = new VariablesDesignUC({
    variablesDesignRepository,
    variablesDesignOptionsRepository,
  });

  const variablesDesign = await useCase.getVariablesDesign();

  return {
    statusCode: 200,
    body: variablesDesign,
  };
};

const getVariablesExecution = async function (httpRequest) {
  const variablesExecutionRepository = new VariablesExecutionRepository();
  const variablesExecutionOptionsRepository = new VariablesExecutionOptionsRepository();
  const useCase = new VariablesExecutionUC({
    variablesExecutionRepository,
    variablesExecutionOptionsRepository,
  });

  const variablesExecution = await useCase.getVariablesExecution();

  return {
    statusCode: 200,
    body: variablesExecution,
  };
};*/

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

module.exports = {
  /*getVariablesDesign,
  getVariablesExecution,*/
  getSolidity,  
}