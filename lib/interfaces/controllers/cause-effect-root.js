import CauseEffectRootUC from '../../application/use-cases/cause-effect/cause-effect-root';
import CauseEffectRootRepository from '../../infrastructure/orm/repositories/cause-effect-root';
import CauseEffectSonRepository from '../../infrastructure/orm/repositories/cause-effect-son';

import RiskCauseEffectUC from '../../application/use-cases/cause-effect/risk-cause-effect';
import RiskCauseEffectRepository from '../../infrastructure/orm/repositories/risk-cause-effect';

const getCauseEffectRoot = async function (httpRequest) {
  const causeEffectRootRepository = new CauseEffectRootRepository();
  const useCase = new CauseEffectRootUC({ causeEffectRootRepository, });

  const causeEffectRoot = await useCase.getCauseEffectRoot();

  return {
    statusCode: 200,
    body: causeEffectRoot,
  };
};

const saveCauseEffectRoot = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const causeEffectRootRepository = new CauseEffectRootRepository();
  const useCase = new CauseEffectRootUC({ causeEffectRootRepository, });

  const causeEffectRoot = await useCase.saveCauseEffectRoot(httpRequest.body, httpRequest.user, language);

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

    const causeEffectSon = await useCase.saveCauseEffectSon(httpRequest.body, httpRequest.user, language);

    return {
      statusCode: 201,
      body: causeEffectSon,
    };
  } catch (e) {
    console.log('error', e)
  }

};

const deleteCauseEffectRoot = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const causeEffectSonRepository = new CauseEffectSonRepository();
  const useCase = new CauseEffectRootUC({ causeEffectSonRepository });
  const causeEffectSon = await useCase.getCauseEffectSonByRoot(id);
  if (causeEffectSon.length === 0) {
    const causeEffectRootRepository = new CauseEffectRootRepository();
    const useCase = new CauseEffectRootUC({ causeEffectRootRepository });
    const deleteElemet = await useCase.deleteCauseEffectRoot(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar la Causa/Consecuencia' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Causa/Consecuencia eliminada' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'La causa/consecuencia tiene relaciones hijas' }
    };
  }


};

const deleteCauseEffectSon = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const riskCauseEffectRepository = new RiskCauseEffectRepository();
  const useCase = new RiskCauseEffectUC({ riskCauseEffectRepository, });

  const causeEffectSon = await useCase.getRiskCauseEffectByCause(id);
  console.log("🚀🥵 ~ file: cause-effect-root.js:119 ~ deleteCauseEffectSon ~ causeEffectSon:", causeEffectSon)
  if (causeEffectSon?.length === 0) {
    const causeEffectSonRepository = new CauseEffectSonRepository();
    const useCase = new CauseEffectRootUC({ causeEffectSonRepository });
    const deleteElemet = await useCase.deleteCauseEffectSon(id, httpRequest.user);

    if (deleteElemet.raw === 0) {
      return {
        statusCode: 400,
        body: { message: 'No se pudo eliminar la Causa/Consecuencia hija' }
      };
    } else {
      return {
        statusCode: 200,
        body: { message: 'Causa/Consecuencia hija eliminada' }
      };
    }
  } else {
    return {
      statusCode: 400,
      body: { message: 'La causa/consecuencia hija tiene riesgos relacionados' }
    };
  }


};

module.exports = {
  getCauseEffectRoot,
  saveCauseEffectRoot,
  getCauseEffectSon,
  saveCauseEffectSon,
  deleteCauseEffectRoot,
  deleteCauseEffectSon,
}