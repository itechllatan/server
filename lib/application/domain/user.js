
import { validateEmail, validatePasswordFormat } from '../../infrastructure/helpers/validations';

class User {
  constructor({
    id_user,
    nickname,
    email,
    password,
    name,
    last_name,
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    validateEmail(email, language);
    // validatePasswordFormat(password, language);
    this.id_user = id_user;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.name = name;
    this.last_name = last_name;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default User;
