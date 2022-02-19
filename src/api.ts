import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes"
import Logger, { LOG_LABELS } from "./utilities/logger";


const app = express();
app.use(cors({ origin: config.corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(config.port, () =>
  Logger.info(LOG_LABELS.START_APP, `✅  Ready on port http://localhost:${config.port}`)
);
