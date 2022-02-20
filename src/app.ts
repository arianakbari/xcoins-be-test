import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import config from "./config";
import routes from "./routes";
import { errorMiddleware, notFoundMiddleware } from "./middlewares";
import swaggerDoc from "../swagger.json";

const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
);
app.use("/api/v1", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
