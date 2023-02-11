import { requiredParam } from '../../infrastructure/helpers/validations'

class UserAuthority {
    constructor({
        id_user_authority,
        user = requiredParam('user', language),
        authority = requiredParam('authority', language),
        language,
    }) {
        this.id_user_authority = id_user_authority;
        this.user = user;
        this.authority = authority;
    }
}

export default UserAuthority;
