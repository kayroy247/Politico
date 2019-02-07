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
    name: Joi.string().required().trim().required(),
    hqAddress: Joi.string().trim().min(3).required(),
    logoURL: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

const validateCreateUser = (input) => {
  const schema = {
    firstname: Joi.string().min(3).trim().required(),
    lastname: Joi.string().trim().min(3).required(),
    email: Joi.string().email().trim().min(3)
      .required(),
    isAdmin: Joi.boolean(),
    phoneNumber: Joi.number().min(8).required(),
    passportURL: Joi.string().trim().min(3),
    password: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

const validatePartyName = (input) => {
  const schema = {
    name: Joi.string().required().trim()
  };
  return Joi.validate(input, schema);
};

const validateLogin = (input) => {
  const schema = {
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

const validateCreateVote = (input) => {
  const schema = {
    office: Joi.number().required(),
    candidate: Joi.number().required()
  };
  return Joi.validate(input, schema);
};

const validateCreateCandidate = (input) => {
  const schema = {
    office: Joi.number().required(),
    party: Joi.number().required()
  };
  return Joi.validate(input, schema);
};
const validator = {
  validateCreateVote,
  validateCreateOffice,
  validateCreateParty,
  validatePartyName,
  validateCreateUser,
  validateLogin,
  validateCreateCandidate
};

export default validator;
