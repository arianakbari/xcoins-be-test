import app from "./app";
import config from "./config";
import Logger, { LOG_LABELS } from "./utilities/logger";
import initDatabase from "./databases/mongodb";

initDatabase();
app.listen(config.port, () =>
    Logger.info(
        LOG_LABELS.START_APP,
        `✅  Ready on port http://localhost:${config.port}`
    )
);
