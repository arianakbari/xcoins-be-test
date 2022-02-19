import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes"


const app = express();
app.use(cors({ origin: config.corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(config.port, () =>
  console.log(`✅  Ready on port http://localhost:${config.port}`)
);
