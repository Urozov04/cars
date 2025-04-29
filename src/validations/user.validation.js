import Joi from "joi";

const user = Joi.object({
  fullName: Joi.string().min(3).max(30).required().trim(),
  email: Joi.string().email().min(5).max(30).required().trim(),
  password: Joi.string().min(8).max(50).required().trim(),
  role: Joi.string()
});

export const userValidation = (data) => {
  return user.validate(data);
};
