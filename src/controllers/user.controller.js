import User from "../models/user.model.js";
import { userValidation } from "../validations/user.validation.js";
import { catchError } from "../utils/error-response.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { setCache, getCache } from "../utils/catch.js";
import { transporter } from "../utils/transporter.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token.js";
import { generateOtp } from "../utils/otp-generate.js";

export class UserController {
  async createUser(req, res) {
    try {
      const { error, value } = userValidation(req.body);
      if (error) {
        console.log(error);

        catchError(res, 400, error);
      }

      const { fullName, email, password } = value;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.json({
          statusCode: 409,
          message: "User already exists",
        });
      }

      const hashedPassword = await encode(password);

      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: "user",
      });

      res.json({
        statusCode: 201,
        message: "success",
        data: user,
      });
    } catch (error) {
      catchError(error, res, error.message);
    }
  }

  async signinUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        catchError(res, 404, "User not found");
      }

      const isMatch = await decode(password, user.password);
      if (!isMatch) {
        catchError(res, 400, "Invalid password");
      }

      const otp = generateOtp();
      const mailMessage = {
        from: process.env.SMTP_USER,
        to: "durozov46@gmail.com",
        subject: "Viscal Barca",
        text: otp,
      };
      transporter.sendMail(mailMessage, function (err, info) {
        if (err) {
          catchError(res, 400, `Error on sending to mail: ${err}`);
        } else {
          console.log(info);
          setCache(user.email, otp);
        }
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Confirmation code send your email",
        data: {},
      });


    } catch (error) {
      catchError(error, res);
    }
  }

  async confirmLogin(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        catchError(res, 404, "User not found");
      }
      const otpCache = getCache(email)
      
      if(!otpCache || otpCache !== otp ){
        catchError(res, 400, "OTP expired")
      }
      
    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    
    // const refreshToken = generateRefreshToken(payload)
    return res.json({
      statusCode: 200,
      message: "success",
      data: {
        accessToken
      },
    });
    } catch (error) {
        catchError(res, 500, error.message)
    }
  }

  async getAllUsers(_, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: users,
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
        data: user,
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

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedUser,
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
        data: {},
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        catchError(res, 404, "Admin not found");
      }
      return user;
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async signoutUser(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        catchError(res, 401, "refresh token not found");
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        catchError(res, 401, "refresh token expired");
      }
      res.clearCookie("refreshToken");
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error);
    }
  }

  // async accessToken(req, res){
  //     try {
  //         const refreshToken = req.cookies.refreshToken;
  //         if(!refreshToken){
  //             catchError(res, 401, 'refresh token not found')
  //         }
  //         const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
  //         if(!decodedToken){
  //             catchError(res, 401, 'refresh token expired')
  //         }
  //         const payload = { id: decodedToken.id, role:decodedToken.role };
  //         const accessToken = generateAccessToken(payload);
  //         return res.status(200).json({
  //             statusCode:200,
  //             message: 'success',
  //             data: accessToken
  //         })
  //     } catch (error) {
  //         catchError(res, 500, error.message)
  //     }
  // }
}
