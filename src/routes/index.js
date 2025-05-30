import express from "express";
import userRoute from "./userRouter.js";
import addressRoute from "./addressRouter.js";

const app = express();
app.use("/api/v1/user", userRoute);
app.use("/api/v1/address", addressRoute);

export default app;
