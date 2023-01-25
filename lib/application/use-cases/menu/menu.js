
class MenuUC {
    constructor({ menuRepository, authorityMenuRepository }) {
        this.menuRepository = menuRepository;
        this.authorityMenuRepository = authorityMenuRepository;
    }

    async getMenu() {
        try{
            return await this.menuRepository.findAll({
                fields: ["id_menu", "url", "description", "is_menu"]
            });
        }catch(e){
            return e;
        }
    }

    async validateRoute(url, user){
        try{
            return await this.authorityMenuRepository.validateRoute(url, user.id_user);
        }catch(e){
            return e;
        }
    }
}

export default MenuUC;
