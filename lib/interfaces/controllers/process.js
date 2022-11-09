import JwtManager from '../../infrastructure/security/jwt-manager';
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import GetProcessUC from '../../application/use-cases/process/get-process'

const getProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetProcessUC({
    processRepository,
    jwt,
  });

  const process = await useCase.getProcess(language);

  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  const processRepository = new ProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetProcessUC({
    processRepository,
    jwt,
  });

  const process = await useCase.getProcessById({ id, }, language);

  return {
    statusCode: 200,
    body: process,
  };
};

const saveProcess = async function (httpRequest) {
  const { name, evidence, description, typeProcess, categoryProcess, user } = httpRequest.body;
  
  //console.log('datos',name, evidence, description, typeProcess, categoryProcess, user);
  
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = 
  await useCase.saveProcess(
                            //httpRequest.body, 
                            { name, evidence, description, typeProcess, categoryProcess, user },
                            language
                           );
  return {
    statusCode: 200,
    body: process,
  };
};


module.exports = {
  getProcess,
  getProcessById,
  saveProcess,
}