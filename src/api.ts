import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express"; 
import config from "./config";
import routes from "./routes"
import Logger, { LOG_LABELS } from "./utilities/logger";
import notFoundHandler from "./middlewares/404.middleware";
import errorHandler from "./middlewares/error.middleware";
import swaggerDoc from "../swagger.json";


const app = express();
app.use(cors({ origin: config.corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
app.use("/api/v1", routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () =>
  Logger.info(LOG_LABELS.START_APP, `✅  Ready on port http://localhost:${config.port}`)
);
