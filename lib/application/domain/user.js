
import {
    validateEmail,
    validatePasswordFormat
  } from '../../infrastructure/helpers/validations';
  
  class User {
    constructor({
      id_user,
      email,
      password,
      created_at,
      deleted_at,
      update_at,
      language
    }) {
      validateEmail(email,
        language);
      validatePasswordFormat(password,
        language);
  
      this.id_user = id_user;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.deleted_at = deleted_at;
      this.update_at = update_at;
    }
  }
  
  export default User;
  