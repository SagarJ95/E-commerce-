const Joi = require("joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const { password, ...userData } = data; // remove the password from userData
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(userData, { abortEarly: false });
};

module.exports.contactValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().message("First Name is required").required(),
    last_name: Joi.string().message("Last Name is required").required(),
    email: Joi.string().message("Email id is required").email.required(),
  });

  return schema.validate(data);
};
