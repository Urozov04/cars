import { Parking } from "../models/parking.model.js";
import { catchError } from "../utils/error-response.js";

export class ParkingController {
    async createParking(req, res) {
        try {
            const { location, slotNumber, isBooked, bookedBy, car, bookedAt } = req.body;

            const newParking = await Parking.create({
                location,
                slotNumber,
                isBooked,
                bookedBy,
                car,
                bookedAt,
            });

            return res.status(201).json({
                statusCode: 201,
                message: "Parking created successfully",
                data: newParking,
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAllParkings(_, res) {
        try {
            const parkings = await Parking.find()
                .populate("bookedBy")
                .populate("car");

            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: parkings,
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getParkingById(req, res) {
        try {
            const parking = await this.findById(req.params.id, res);
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: parking,
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateParkingById(req, res) {
        try {
            await this.findById(req.params.id, res);

            const updatedParking = await Parking.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                statusCode: 200,
                message: "Parking updated successfully",
                data: updatedParking,
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteParkingById(req, res) {
        try {
            await this.findById(req.params.id, res);

            await Parking.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                statusCode: 200,
                message: "Parking deleted successfully",
                data: {},
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async findById(id, res) {
        try {
            const parking = await Parking.findById(id)
                .populate("bookedBy")
                .populate("car");

            if (!parking) {
                return catchError(res, 404, "Parking not found");
            }

            return parking;
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }
}
