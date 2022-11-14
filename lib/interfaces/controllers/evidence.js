import GetProcessUC from '../../application/use-cases/process/get-process'
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import multer from 'Multer';

const getProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcess(language);

  return {
    statusCode: 200,
    body: process,
  };
};

const saveProcess = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.saveProcess(httpRequest.body, language);
  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessById = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcessById({ id, }, language);

  return {
    statusCode: 200,
    body: process,
  };
};

const getProcessByMacro = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const processRepository = new ProcessRepository();
  const useCase = new GetProcessUC({
    processRepository,
  });

  const process = await useCase.getProcessByMacro({ id, }, language);

  return {
    statusCode: 200,
    body: process,
  };
};

const sendEvidence = async function (httpRequest) {
  console.log('httpRequest', httpRequest)
  upload.single("files")
  const storage = multer.diskStorage(
    {
      filename: function (res, file, cb) {
        const ext = file.originalname.split('.').pop() //ultimo valor del split - extencion
        const fileName = Date.now()
        //error, nombre
        cb(null, `${fileName}.${ext}`) //retornamos el nombre dle archivo
      },
      destination: function (res, file, cb) {
        //error, donde guarda 
        cb(null, '/evidence') //retornamos el nombre dle archivo
      }
    }
  )

  const upload = multer({storage})
  
  return {
    statusCode: 200,
    body: 'ok',
  };
};

module.exports = {
  getProcess,
  saveProcess,
  getProcessById,
  getProcessByMacro,
  sendEvidence
}