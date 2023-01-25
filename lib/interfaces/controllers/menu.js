import MenuUC from '../../application/use-cases/menu/menu';
import MenuRepository from '../../infrastructure/orm/repositories/menu';
import AuthorityMenuRepository from '../../infrastructure/orm/repositories/authority-menu';

const getMenu = async function () {
  const menuRepository = new MenuRepository();
  const useCase = new MenuUC({ menuRepository, });

  const menu = await useCase.getMenu();
  return {
    statusCode: 200,
    body: menu,
  };
};

const validateRoute = async function (httpRequest) {
  if(!httpRequest.body.url){
    return {
      statusCode: 400,
      message: "Se necesita la ruta para validar"
    }
  }
  const authorityMenuRepository = new AuthorityMenuRepository();
  const useCase = new MenuUC({ authorityMenuRepository });
  const menu = await useCase.validateRoute(httpRequest.body.url ,httpRequest.user);
  
  return {
    statusCode: 200,
    body: menu
  }
}
module.exports = {
    getMenu,
    validateRoute
}