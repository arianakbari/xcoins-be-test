import mongoose from 'mongoose';
import config from '../config';
import Logger, { LOG_LABELS } from '../utilities/logger';

const {
    userName,
    password,
    hostname,
    databaseName,
} = config.mongodb;

let connectionString: string;

if (userName && password) {
    connectionString = `mongodb://${userName}:${password}@${hostname}/${databaseName}`;
} else {
    connectionString = `mongodb://${hostname}/${databaseName}`;
}

try {
    mongoose.connect(connectionString, {
        connectTimeoutMS: 4000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
} catch (error) {
    Logger.error(LOG_LABELS.DB_CONNECTION, 'Failed to connect to MongoDB: ', error);
}

mongoose.connection.on('connected', () => {
    Logger.debug(LOG_LABELS.DB_CONNECTION, 'Connected to MongoDB!');
});

mongoose.connection.on('error', (error) => {
    Logger.error(LOG_LABELS.DB_CONNECTION, 'Connection Error: ', error)
    throw new Error(`Can't to connect to MongoDB: ${connectionString}`);
});

export default mongoose;
