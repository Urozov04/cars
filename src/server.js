import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.routes.js"
import carRouter from "./routes/car.routes.js"
import parkingRouter from "./routes/parking.routes.js"
dotenv.config();

const app = express();

const PORT = +(process.env.PORT) || 3000;

app.use(express.json());
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/car", carRouter)
app.use("/parking", parkingRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});