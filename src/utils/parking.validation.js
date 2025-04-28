import Joi from "joi"

const carParking = Joi.object({
    location: Joi.string().required().min(3),
    slotNumber: Joi.number().required(),
    isBooked: Joi.boolean().required(),
    bookedBy: Joi.string().required(),
    car: Joi.string().required(),
    bookedAt: Joi.date().required()
})

export const carParkingValidator = (data) => {
    return carParking.validate(data)
}