import { User } from "../models/user.model.js";
import { userValidation } from "../utils/user.validation.js";
import { catchError } from "../utils/error-response.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generate-token.js";

export class UserController {
    async createUser(req, res) {
        try {
            const { error, value } = userValidation(req.body);
            if (error) {
                throw new Error(`Error on creating user: ${error}`);
            }

            const { fullName, email, password } = value;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "User already exists",
                });
            }

            const hashedPassword = await decode(password, 7);

            const user = await User.create({
                fullName,
                email,
                password: hashedPassword,
                role: "user"
            });

            return res.status(201).json({
                statusCode: 201,
                message: "success",
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAllUsers(_, res) {
        try {
            const users = await User.find();
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: users
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }

            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }

            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: updatedUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }

            await User.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: "User deleted successfully",
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async signinUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await encode(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }

            const payload = { id: user._id, role: user.role };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}
