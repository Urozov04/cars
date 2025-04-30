import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import carRouter from "./routes/car.routes.js";
import parkingRouter from "./routes/parking.routes.js";
import morgan from "morgan";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const PORT = +process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/car", carRouter);
app.use("/parking", parkingRouter);

// app.use(morgan("dev"))
const _dirname = path.resolve();
const fileName = fs.createWriteStream(path.join(_dirname, "access.log"), {
  flag: "a",
});
if (process.env.NODE_ENV === "PRODUCTION") {
  console.log("kirdi");

  app.use(
    morgan("combined", {
      stream: fileName,
    })
  );
  console.log("Yozdi");
  
} else {
  app.use(morgan("DEV"));
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
