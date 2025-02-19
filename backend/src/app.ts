import express from "express";
import cors from "cors";

import binRoutes from "./controllers/binRoutes";

import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./middleware/middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("build"));

app.use("/bin", binRoutes);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
