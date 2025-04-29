import Car from "../validations/car.validation.js";
import { catchError } from "../utils/error-response.js";

export class CarController {
  async createCar(req, res) {
    try {
      const { user, plateNumber, model, color } = req.body;

      const newCar = await Car.create({
        user,
        plateNumber,
        model,
        color,
      });

      return res.status(201).json({
        statusCode: 201,
        message: "Car created successfully",
        data: newCar,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllCars(_, res) {
    try {
      const cars = await Car.find();
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: cars,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getCarById(req, res) {
    try {
      const car = await this.findById(req.params.id);
      return (
        res.status(200),
        json({
          statusCode: 200,
          message: "success",
          data: car,
        })
      );
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateCarById(req, res) {
    try {
      await this.findById(req.params.id);
      const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedCar,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async deleteCarById(req, res) {
    try {
      await Car.findByIdAndDelete(id);
      return (
        res.status(200),
        json({
          statusCode: 200,
          message: "success",
          data: {},
        })
      );
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
