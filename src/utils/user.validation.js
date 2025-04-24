import Joi from "joi"

const user = Joi.object({
    fullname: Joi.string().min(3).max(30).required().trim(),
    email: Joi.string().email().min(5).max(30).required().trim(),
    password: Joi.string().min(8).max(50).required().trim()
})

export const userValidation = (data) => {
    return user.validate(data)
}