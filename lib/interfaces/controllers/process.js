import JwtManager from '../../infrastructure/security/jwt-manager';
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import GetProcess from '../../application/use-cases/process/get-process'

const getProcess = async function (httpRequest) {
  //const { nombre, evidencia } = httpRequest.body;

  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const jwt = new JwtManager();
  const useCase = new GetProcess({
    processRepository,
    jwt,
  });

  const process = await useCase.getProcess(language);
  console.log('process contr', process);
  
  return {
    statusCode: 200,
    body: process,
  };
};

module.exports = {
  getProcess,
}