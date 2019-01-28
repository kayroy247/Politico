import Joi from 'joi';

const validateCreateOffice = (input) => {
  const schema = {
    type: Joi.string().required(),
    name: Joi.string().trim().min(3).required()
  };
  return Joi.validate(input, schema);
};

export default validateCreateOffice;
