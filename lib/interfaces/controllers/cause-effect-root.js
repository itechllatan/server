import CauseEffectRootUC from '../../application/use-cases/cause-effect/cause-effect-root';
import CauseEffectRootRepository from '../../infrastructure/orm/repositories/cause-effect-root';
import CauseEffectSonRepository from '../../infrastructure/orm/repositories/cause-effect-son';


const getCauseEffectRoot = async function (httpRequest) {
  const causeEffectRootRepository = new CauseEffectRootRepository();
  const useCase = new CauseEffectRootUC({ causeEffectRootRepository, });
  console.log('httpRequest', httpRequest)
  const causeEffectRoot = await useCase.getCauseEffectRoot();
  console.log('causeEffectRoot', causeEffectRoot)
  return {
    statusCode: 200,
    body: causeEffectRoot,
  };
};

const saveCauseEffectRoot = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const causeEffectRootRepository = new CauseEffectRootRepository();
  const useCase = new CauseEffectRootUC({ causeEffectRootRepository, });

  const causeEffectRoot = await useCase.saveCauseEffectRoot(httpRequest.body, language);

  return {
    statusCode: 201,
    body: causeEffectRoot,
  };
};

const getCauseEffectSon = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const causeEffectSonRepository = new CauseEffectSonRepository();
  const useCase = new CauseEffectRootUC({ causeEffectSonRepository });
  const causeEffectSon = await useCase.getCauseEffectSon(id);
  return {
    statusCode: 200,
    body: causeEffectSon
  };
};

const saveCauseEffectSon = async function (httpRequest) {
  try {
    const language = httpRequest.headers?.Language;
    const causeEffectSonRepository = new CauseEffectSonRepository();
    const useCase = new CauseEffectRootUC({ causeEffectSonRepository, });

    const causeEffectSon = await useCase.saveCauseEffectSon(httpRequest.body, language);

    return {
      statusCode: 201,
      body: causeEffectSon,
    };
  } catch (e) {
    console.log('error', e)
  }

};

module.exports = {
  getCauseEffectRoot,
  saveCauseEffectRoot,
  getCauseEffectSon,
  saveCauseEffectSon,
}