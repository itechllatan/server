import {
    InvalidPropertyError,
    InvalidNullError,
    FormatDocumentError,
    InvalidDateError,
  } from './errors';
  import messages from './../../application/use-cases/support/messages.json';
  import messages_en from './../../application/use-cases/support/messages_en.json';
  
  const message = messages.helpers.validations;
  const message_en = messages_en.helpers.validations;
  
  export const requiredParam = function (param, language) {
    const mess = language && language === 'en' ? message_en : message;
    const requiredParamError = new Error(mess.requiredParamError + param);
    Error.captureStackTrace(requiredParamError,
      requiredParam);
    throw requiredParamError;
  };
  
  export const validateParam = function ({
    type = null,
    min = null,
    max = null,
    language,
    label,
    value,
  }) {
    label = label ? label : requiredParam('label',
      language);
    value = value ? value : requiredParam(label,
      language);
    const mess = language && language === 'en' ? message_en : message;
  
    if (type && type === 'number' && isNaN(parseInt(value,
      10))) {
      throw new InvalidPropertyError(label + mess.type + type + '.');
    }
  
    if (min && value.toString().length < min) {
      throw new InvalidPropertyError(label + mess.min + min + mess.chars,
        label,
        'min');
    } else if (max && value.toString().length > max) {
      throw new InvalidPropertyError(label + mess.max + max + mess.chars,
        label,
        'max');
    } else {
      return value;
    }
  };
  
  export const validateEmail = function (email, language) {
    const mess = language && language === 'en' ? message_en : message;
    if (email) {
      const valid = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
      if (!valid.test(email)) {
        throw new InvalidPropertyError(mess.bad_email,
          'email');
      }
    }
  };
  
  export const validateJustNumber = function (value, field, language) {
    const mess = language && language === 'en' ? message_en : message;
    if (value) {
      const valid = new RegExp(/^[0-9]*$/);
      if (!valid.test(value)) {
        throw new InvalidPropertyError(
          mess.validateJustNumber + field + mess.validateJustNumber_1,
          'number'
        );
      }
    }
  };
  
  export const validateJustFloatNumber = function (value, field, language) {
    const mess = language && language === 'en' ? message_en : message;
  
    if (value) {
      const valid = new RegExp(/^[0-9,.\s]+$/);
      if (!valid.test(value)) {
        throw new InvalidPropertyError(mess.only_numbers + field,
          'number');
      }
    }
  };
  
  export const validatePasswordFormat = function (password, language) {
    const mess = language && language === 'en' ? message_en : message;
    if (password) {
      const valid = new RegExp(
        /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)[A-ZñÑa-z\d!¡?¿$%@#£€*&^<>()+-_{}]{8,}$/
      );
      if (!valid.test(password)) {
        throw new InvalidPropertyError(mess.pass_format,
          'password');
      }
    }
  };
  
  export const ValidateDate = function (date, language) {
    const mess = language && language === 'en' ? message_en : message;
    if (date) {
      const valid = new RegExp(
        /(?:^(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)/
      );
      if (!valid.test(JSON.stringify(date))) {
        throw new InvalidDateError(mess.no_date,
          'date');
      }
    }
  };
  
  export const validateIsNotNull = function (value, field, language) {
    const mess = language && language === 'en' ? message_en : message;
    if (!value) {
      throw new InvalidNullError(mess.no_null + field);
    }
  };
  
  export const validateIsNotNegativeValue = function (value, field, language) {
    const mess = language && language === 'en' ? message_en : message;
    const result = Math.sign(value);
    if (result === -1) {
      throw new InvalidPropertyError(mess.no_neg + field);
    }
  };
  
  export const validateOneValueBeTrue = function (values, fields, language) {
    const mess = language && language === 'en' ? message_en : message;
    const result = values.find(value => value === true);
    if (!result) {
      throw new InvalidPropertyError(mess.true + fields);
    }
  };
  
  export const validateStringLength = function ({
    type = null,
    min = null,
    max = null,
    label,
    value,
    language,
  }) {
    const mess = language && language === 'en' ? message_en : message;
    if (value) {
      if (type && typeof value !== 'string') {
        throw new InvalidPropertyError(label + mess.type + type + '.');
      }
  
      if (min && value.length < min) {
        throw new InvalidPropertyError(label + mess.min + min + mess.chars,
          label,
          'min');
      }
      if (max && value.length > max) {
        throw new InvalidPropertyError(label + mess.max + max + mess.chars,
          label,
          'max');
      }
    }
    return value;
  };
  
  export const validateFormat = function (mimetype, language) {
    const mess = language && language === 'en' ? message_en : message;
    const acceptedMimetype = [
      'text/plain',
      'application/msword',
      'application/pdf',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const result = acceptedMimetype.find(value => value === mimetype);
    if (!result) {
      throw new FormatDocumentError(mess.doc_format + '.txt .doc .pdf .docx');
    }
  };
  
  export const validateFormatImages = function (mimetype, language) {
    const mess = language && language === 'en' ? message_en : message;
    const acceptedMimetype = ['image/gif', 'image/png', 'image/jpeg'];
    const result = acceptedMimetype.find(value => value === mimetype);
    if (!result) {
      throw new FormatDocumentError(mess.doc_format + '.jpg, .jpeg, .png, .gif');
    }
  };
  
  export const queryJustNumber = function (value) {
    if (value) {
      const valid = new RegExp(/^[0-9]*$/);
      if (!valid.test(value)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  
  export const floorControl = function (floor) {
    let result = false;
    if (floor) {
      floor = floor.toLowerCase();
      const valid = new RegExp(/^(-[1-2]|[1-9]|[1-5][0-9]|60|bj|en|ss|st)$/);
      if (valid.test(floor)) {
        result = true;
      }
    }
    return result;
  };
  
  export const doorControl = function (door) {
    let result = false;
    if (door) {
      const valid = new RegExp(/^[A-ZñÑa-z0-9\s]{0,4}$/);
      if (valid.test(door)) {
        result = true;
      }
    }
    return result;
  };
  
  export const ladderControl = function (ladder) {
    let result = false;
    if (ladder) {
      const valid = new RegExp(/^[A-ZñÑa-z0-9\s]{0,10}$/);
      if (valid.test(ladder)) {
        result = true;
      }
    }
    return result;
  };
  
  export const yearBuildingControl = function (year_building) {
    let result = false;
    if (year_building) {
      const valid = new RegExp(/[1-2][0-9]{3}$/);
      if (valid.test(year_building)) {
        result = true;
      }
    }
    return result;
  };
  
  export const postalCodeControl = function (postal_code) {
    let result = false;
    if (postal_code) {
      const valid = new RegExp(/^[0-9]{5}$|^AD[0-9]{3}$|^[0-9]{4}(-[0-9]{3})?$/);
      if (valid.test(postal_code)) {
        result = true;
      }
    }
    return result;
  };
  
  export const urlControl = function (url) {
    let result = false;
    if (url) {
      const valid = new RegExp(/^(http)(s?):\/\/.*$/);
      if (valid.test(url)) {
        result = true;
      }
    }
    return result;
  };
  
  export const validateDocumentType = function ({ validators, type, label, language }) {
    const mess = language && language === 'en' ? message_en : message;
  
    if (validators?.doc_type && parseInt(validators?.doc_type,
      10) !== parseInt(type,
      10)) {
      throw new InvalidPropertyError(label + mess.type + validators?.doc_type + '.');
    }
  };
  
  export const validateDocumentCategory = function ({ validators, type, label, language }) {
    const mess = language && language === 'en' ? message_en : message;
  
    if (validators?.doc_category && parseInt(validators?.doc_category,
      10) !== parseInt(type,
      10)) {
      throw new InvalidPropertyError(label + mess.type + validators?.doc_category + '.');
    }
  };
  