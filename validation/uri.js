const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateURI(data) {
  let errors = {};

  data.uri = !isEmpty(data.uri) ? data.uri : '';
  
  if (!isEmpty(data.uri)) {
    if (!Validator.isURL(data.uri)) {
      errors.uri = 'Not a valid URL';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}