import Joi from "joi"

const car = Joi.object({
    user:Joi.string().required(),
    plateNumber: Joi.string().required().min(1).max(20),
    model: Joi.string().required().min(1),
    color: Joi.string().required().min(1)
})

const carValidator = (data) => {
    return car.validate(data);
}

export default carValidator