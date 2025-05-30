import express from "express";
import Router from "./src/routes/index.js";
import cors from "cors";
import morgan from "morgan";
const port = 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(Router);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
