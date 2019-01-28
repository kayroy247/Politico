import Joi from 'joi';

const validateCreateOffice = (input) => {
  const schema = {
    type: Joi.string().trim().min(3).required(),
    name: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

const validateCreateParty = (input) => {
  const schema = {
    name: Joi.string().required().trim(),
    hqAddress: Joi.string().trim().min(3).required(),
    logoURL: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

const validatePartyName = (input) => {
  const schema = {
    name: Joi.string().required().trim()
  };
  return Joi.validate(input, schema);
};

const validator = { validateCreateOffice, validateCreateParty, validatePartyName };
export default validator;
