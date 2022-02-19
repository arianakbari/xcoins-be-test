import mongoose from 'mongoose';
import config from '../config';

const {
    userName,
    password,
    hostname,
    databaseName,
    replicaSet,
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
        replicaSet,
    });
} catch (error) {
    console.log('Failed to connect to MongoDB: ', error)
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!')
});

mongoose.connection.on('error', (error) => {
    console.log('Connection Error: ', error);
    throw new Error(`Can't to connect to MongoDB: ${connectionString}`);
});

export default mongoose;
